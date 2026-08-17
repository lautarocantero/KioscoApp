# 🔔 Notificaciones — Documentación técnica

## Índice

1. [Resumen](#resumen)
2. [Modelo mental](#modelo-mental)
3. [Backend](#backend)
4. [Frontend](#frontend)
5. [Decisiones de diseño](#decisiones-de-diseño)
6. [Cómo probarlo](#cómo-probarlo)
7. [Límites conocidos](#límites-conocidos)
8. [Archivos tocados](#archivos-tocados-referencia-rápida)

---

## Resumen

Primera versión del sistema de notificaciones: dos tipos, ambos creados por el backend como efecto de `POST /sell/create-sell`, nunca por el frontend.

- **Venta registrada** (`type: "sale"`) — se crea una por cada venta exitosa.
- **Stock bajo** (`type: "low_stock"`) — se crea una por cada presentación vendida que quedó con `stock < min_stock` después del descuento de esa venta.

Las notificaciones son **compartidas entre todos los usuarios** (una sola colección), pero el estado de lectura es **por usuario** (`readBy: string[]` en el documento — nunca se expone tal cual, el back lo resuelve a `status: "not-read-yet" | "readed"` para quien pide la lista). Un mismo vendedor puede ver una notificación como leída mientras otro todavía la ve sin leer.

Frontend: campana en el header (ver [docs/components/NotificationsBell.md](../components/NotificationsBell.md)) + página `/notifications` con tabla y filtros.

## Modelo mental

```
POST /sell/create-sell
  → SellModel.create(...)                     (venta guardada, _id disponible)
  → PresentationModel.decreaseStock(...)       (stock descontado, devuelve _id/product_id/name/stock/min_stock por presentación)
  → NotificationModel.createSaleNotification({ sellId, ... })         (siempre, 1 por venta, en su propio try/catch)
  → NotificationModel.createLowStockNotification({ productId, ... }) × N   (una por cada presentación bajo min_stock,
     CADA UNA en su propio try/catch — si una falla, no tumba a las demás ni a la de venta ya creada)

GET /notification/get-notifications  (authMiddleware)
  → NotificationModel.getAll(req.user.id)
    → cada doc: status = readBy.includes(userId) ? "readed" : "not-read-yet"  (readBy nunca se expone)

PATCH /notification/mark-as-read | mark-as-unread | mark-all-as-read   (authMiddleware, $addToSet / $pull — bidireccional)
DELETE /notification/delete-notification | delete-all-notifications   (delete duro, igual que el resto de las tablas)

Frontend: useNotificationsData → fetch on mount + poll 45s, en la campana (siempre montada) y en /notifications
```

## Backend

Repo: `KioscoAppBackEnd`, rama `feature/notifications-api`. Sigue el patrón exacto de `provider`/`sell`: `schemas/` → `models/` → `controllers/` → `routes/` → `typings/<feature>/index.d.ts`.

### `models/notificationModel.ts`

- `getAll(userId)` — trae todas ordenadas por `createdAt` desc, resuelve `status` por usuario, nunca devuelve `readBy`.
- `markAsRead(_id, userId)` (`$addToSet`) / `markAsUnread(_id, userId)` (`$pull`) / `markAllAsRead(userId)` — ambos de a uno son idempotentes y reversibles entre sí.
- `deleteOne(_id)` / `deleteAll()` — delete duro.
- `createSaleNotification(...)` / `createLowStockNotification(...)` — únicos puntos de creación, llamados desde `sell.controller.ts`. `productName` valida con longitud mínima 1 (no el default de 3 que usa el resto del repo para nombres de usuario/sku) — un nombre de producto real puede ser legítimamente corto ("Pan"), y antes de este ajuste un nombre corto hacía fallar `Validation.stringValidation` silenciosamente (ver "Cómo probarlo" más abajo).

### `routes/notification.routes.ts`

Todas las rutas van con `authMiddleware` (necesita saber quién pregunta para resolver `status`/`readBy`). Antes de esto, `authMiddleware` solo se usaba en 2 rutas de `auth.routes.ts` — el resto del repo confía en el `_id` que manda el cliente. Se optó por autenticar de verdad acá porque el "leído por usuario" no se puede resolver sin conocer al usuario. El flujo de cookies del front (`withCredentials` + interceptor de refresh en `httpClient.ts`) ya soporta esto sin cambios.

`PATCH` se agregó al array `methods` del `cors()` en `src/index.ts` (antes solo tenía `GET/POST/PUT/DELETE`).

### `controllers/sell.controller.ts` — `createSell`

`PresentationModel.decreaseStock` pasó de devolver `void` a devolver las presentaciones actualizadas (`{ _id, product_id, name, stock, min_stock }[]`, vía `{ new: true }` en el `findOneAndUpdate`). Con eso, `createSell` arma la notificación de venta (con el `sellId` recién creado) y filtra `stock < min_stock` para las de stock bajo (con `productId` — lo necesita el frontend para armar `/products/:product_id/presentation/:presentation_id`).

**Aislamiento por notificación**: la notificación de venta y cada notificación de stock bajo se crean en su propio `try/catch` independiente, no uno solo envolviendo todo el bloque. Esto corrigió un bug real: con un único `try/catch` compartido, si `createLowStockNotification` fallaba para una presentación (por ejemplo, por un nombre de producto legado más corto que el mínimo que exigía `Validation.stringValidation`), la excepción abortaba el resto del bloque — la venta ya se había creado antes de entrar ahí, así que la notificación de venta aparecía igual, pero **ninguna** de las notificaciones de stock bajo de esa venta se creaba, sin dejar rastro salvo el log. Ahora un fallo puntual en una presentación no afecta ni a la notificación de venta ni a las demás de stock bajo.

## Frontend

Repo: `KioscoApp`, rama `feature/integrate-notifications`. Ver [docs/components/NotificationsBell.md](../components/NotificationsBell.md) para el detalle de componentes/hooks/helpers.

- Redux (`store/notification/`) es la fuente de verdad del lado del cliente — no hay contexto ni estado local paralelo.
- `useNotificationsData` centraliza fetch + polling; tanto la campana como la página lo usan, cada uno con su propio ciclo de vida.
- Los mensajes cortos ("Fideo Matarazzo 500g necesita reposición (5 unidades)", "Lucas Cantero ha realizado una venta por $ 2.530,00") se arman con `getNotificationMessage` + `i18next`, compartido entre la campana y la tabla.
- `useCart.ts` dispara un `fetchNotificationsThunk()` inmediato justo después de una venta exitosa (fire-and-forget), para que quien vendió vea su propia notificación sin esperar el polling de 45s.
- Cada notificación abre a un detalle propio (`getNotificationDetailRoute`): la venta (`/sell/:sell_id`) o la presentación (`/products/:product_id/presentation/:presentation_id`), vía una flecha dedicada — separada de la acción de marcar leída/no leída.

## Decisiones de diseño

### ¿Por qué el frontend no crea las notificaciones?

El stock se descuenta en el backend (`PresentationModel.decreaseStock`) — el frontend nunca supo, ni antes ni ahora, cuál quedó el stock post-venta. Crear la notificación de stock bajo del lado del cliente hubiera significado adivinar ese número o hacer un segundo round-trip. La venta también se registra en el backend. Ambos eventos ya son 100% del dominio del backend, así que crear ahí es lo único consistente con cómo ya funciona el resto de la app (igual que el descuento de stock, que tampoco lo hace el frontend).

### ¿Por qué `readBy: string[]` y no una colección separada de "lecturas"?

Con el volumen esperado (notificaciones de un kiosco, no miles por día) un array embebido es más simple que una tabla de join, y el único acceso que se necesita (¿este usuario ya la leyó?) es un `includes` — no hace falta indexar por usuario. Si el volumen creciera mucho, separar en una colección `notification_reads` sería el primer paso.

### ¿Por qué "marcar como leída" es bidireccional?

Pedido explícito: el ojo (o la tarjeta entera) tiene que poder volver a "no leída" si se lo vuelve a tocar. El back expone `mark-as-read` ($addToSet) y `mark-as-unread` ($pull) como operaciones simétricas e idempotentes — no un único `read: boolean` en el body, para mantener el mismo estilo REST-y de acción explícita que el resto del módulo (`mark-all-as-read`, etc.).

### ¿Por qué "borrar" es un delete duro y no un soft-delete por usuario?

No hay precedente de soft-delete en ningún otro listado del repo (proveedores, ventas, etc. todos hacen delete duro). Mantenerlo consistente evita inventar un patrón nuevo solo para esta feature — si en el futuro se necesita que cada usuario pueda "ocultar" una notificación sin borrarla para los demás, ahí sí valdría la pena reconsiderarlo.

## Cómo probarlo

1. Levantar `KioscoAppBackEnd` (`npm run dev`, puerto 3000) y `KioscoApp` (`npm run dev`).
2. Loguearse, abrir la campana (arriba a la derecha) — arranca vacía o con lo que ya haya.
3. Hacer una venta desde `/new-sell`. La notificación de venta aparece en "Importante" casi al instante (fetch fire-and-forget); si algún producto vendido quedó bajo su mínimo, aparece también la de stock bajo en "Más notificaciones".
4. Tocar cualquier parte de una tarjeta (o el ojo) → pasa a atenuada, ícono a ojo cerrado; tocar de nuevo → vuelve a "no leída". Recargar la página y confirmar que el último estado persiste (viene del backend).
5. Tocar la flecha de una notificación → navega al detalle de la venta o de la presentación, sin togglear el estado de lectura.
6. "Ver todas las notificaciones" → `/notifications`: probar los 3 tabs (contadores correctos), marcar todas como leídas, borrar una, borrar todas.
7. Loguearse con un segundo usuario (u otra pestaña) y confirmar que el estado leído/no-leído es independiente por usuario para la misma notificación.
8. Cambiar idioma (es/en) y tema (claro/oscuro) desde Ajustes y confirmar que toda la sección traduce y se ve bien en ambos modos.
9. Vender un producto con un nombre corto (< 3 caracteres) — antes del fix de aislamiento por notificación, esto hacía desaparecer silenciosamente la notificación de stock bajo; ahora debe aparecer igual.

### Backend

El proyecto backend no tiene framework de test configurado (`npm test` → `"Error: no test specified"`). No se agregó uno nuevo para esta feature puntual, consistente con el resto del repo — se verifica manualmente (ver arriba).

## Límites conocidos

- **No hay tiempo real de verdad.** El polling es de 45s; una notificación creada por otro vendedor puede tardar hasta ese tiempo en aparecer (salvo la propia venta, que refresca al toque). No hay WebSockets ni SSE.
- **`readBy` crece sin límite** mientras la notificación exista — para el volumen de un kiosco (pocos vendedores) no es un problema, pero si el equipo creciera mucho valdría la pena revisar el modelo.
- **Borrar es global.** Si alguien borra una notificación (o "borrar todas"), desaparece para **todos** los usuarios, no solo para quien la borró — es el mismo comportamiento que cualquier otro delete del repo, pero vale la pena tenerlo presente.

## Archivos tocados (referencia rápida)

**Backend** (`KioscoAppBackEnd`)
- `schemas/notificationSchema.ts`, `models/notificationModel.ts`, `typings/notification/index.d.ts` — nuevos
- `controllers/notification.controller.ts`, `routes/notification.routes.ts` — nuevos
- `src/index.ts` — registra `/notification`, agrega `PATCH` al CORS
- `models/presentationModel.ts` — `decreaseStock` devuelve las presentaciones actualizadas
- `controllers/sell.controller.ts` — `createSell` crea las notificaciones tras descontar stock

**Frontend** (`KioscoApp`)
- `typings/notifications/*`, `modules/notifications/api/notificationApi.ts`, `store/notification/*` — nuevos
- `modules/notifications/helpers/*` (incluye `getNotificationDetailRoute.ts`), `hooks/notifications/*` — nuevos
- `modules/shared/components/NotificationsBell/*`, `modules/notifications/pages/NotificationsPage/*` — nuevos
- `modules/shared/components/DataTable/RowActionsCell.tsx` — acciones de ojo (bidireccional) y flecha de detalle opcionales
- `modules/shared/layout/AppShell.tsx` — monta `NotificationsBell` en el `Box` reservado
- `hooks/cart/useCart.ts` — refetch fire-and-forget tras una venta
- `router/AppRouter.tsx`, `modules/notifications/routes/NotificationRoutes.tsx` — ruta `/notifications`
- `i18n/locales/{es,en}.ts` — namespace `notifications.*`
- `store/store.ts` — registra el slice `notification`
