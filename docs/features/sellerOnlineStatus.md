# 🟢 Estado online/offline de vendedores — Documentación técnica

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

`Seller.user_status` (`"online" | "offline"`) ya existía en el schema desde antes, pero nunca se actualizaba — todo vendedor quedaba `offline` para siempre después de crearse. Esta pasada lo conecta a los eventos reales de sesión:

- **Login exitoso** (email/password o Google) → `user_status: online`.
- **Sesión válida verificada** (`check-auth` al montar la app, y `refresh` cuando vence el `access_token`) → también marca `online`. Esto es lo que cubre a alguien que ya tenía sesión abierta de antes y vuelve a abrir la app sin volver a tipear usuario/contraseña.
- **Logout** → `user_status: offline`.

Y del lado del frontend:

- La tabla de vendedores tiene una columna **Estado** (punto verde/gris + texto).
- La lista siempre se ordena con los **online primero**.
- La card de "Vendedores" en el Home muestra la cantidad real de online (antes mockeada en 0).

> **Fix post-lanzamiento:** la primera versión de esto solo marcaba `online`
> en `login`. Un usuario con sesión ya abierta de antes (cookie
> `refresh_token` vigente) nunca vuelve a pasar por `/auth/login` — pasa por
> `/auth/check-auth` al abrir la app — así que seguía viendo `offline` pese a
> estar activo. Se corrigió marcando `online` también ahí (ver
> [`checkAuth`](#authmodelts--checkauth) más abajo).

## Modelo mental

```
POST /auth/login (o /auth/google)          POST /auth/check-auth (al abrir la app)
  → password/OAuth OK                        POST /auth/refresh (cada vez que vence el access_token)
    → user_status: "online"                    → AuthModel.checkAuth({_id})
                                                   → user_status: "online" (sesión activa = online)

POST /auth/logout
  → AuthModel.deleteRefreshToken (invalida el refresh token)
    → SellerModel.edit({_id, user_status: "offline"})   (best-effort, no bloquea el logout)
      → clearCookie(access_token, refresh_token)

GET /seller/get-sellers  →  cada Seller trae su user_status real
  → useSellersListData ordena: online primero (sortSellersOnlineFirst)
  → useSellersLinkData cuenta online (countOnlineSellers) para la card del Home
```

## Backend

### `authModel.ts` — `login`

Antes leía el `Seller` con un `findOne` de solo lectura. Ahora es un `findOneAndUpdate` que además marca `online` y devuelve el doc ya actualizado (`{ new: true }`), así la respuesta de login ya refleja el estado correcto sin un segundo roundtrip:

```ts
const sellerObject = await SellerSchema.findOneAndUpdate(
    { _id: authObject._id },
    { $set: { user_status: SellerStatus.online } },
    { new: true },
).lean();
```

Mismo cambio en la rama de `loginOrCreateWithGoogle` para un usuario **existente**. Para un usuario **nuevo** vía Google, se crea directo con `user_status: online` (a diferencia de `/register`, que no loguea automáticamente — ese sigue creando en `offline`).

### `authModel.ts` — `checkAuth`

`checkAuth` valida que una sesión siga siendo válida — la llama el frontend al montar la app (`POST /check-auth`) **y** internamente `refresh()` cada vez que renueva el `access_token` (`POST /refresh`, con el `access_token` de 5 minutos, bastante seguido en una sesión activa). Antes solo leía el `Seller` (`findOne`); ahora también lo marca online, con el mismo patrón que `login`:

```ts
const sellerObject = await SellerSchema.findOneAndUpdate(
    { _id: idResult },
    { $set: { user_status: SellerStatus.online } },
    { new: true },
).lean();
```

Esto es lo que hace que "online" refleje una sesión **activa**, no solo "en algún momento hizo login": alguien que ya tenía el `refresh_token` guardado y vuelve a abrir la app nunca vuelve a pasar por `/login`, pasa por acá.

### `auth.controller.ts` — `logout`

```ts
await AuthModel.deleteRefreshToken({ _id: payload.id });

// Best-effort: si el Seller ya no existe o falla, el logout igual debe
// completarse (limpiar cookies es lo importante acá).
await SellerModel.edit({ _id: payload.id, user_status: SellerStatus.offline }).catch(() => {});

res.clearCookie('access_token').clearCookie('refresh_token')...
```

Reusa `SellerModel.edit` (ya soportaba `user_status`, lo usaba el endpoint `PUT /seller/edit-seller`). El `.catch(() => {})` es deliberado: si por lo que sea la actualización de estado falla, no debe convertir un logout válido en un error 500 — lo importante de logout es invalidar la sesión.

## Frontend

### Enum `SellerStatus` — bug de casing corregido

```ts
// antes (typings/seller/sellerEnums.ts)
export enum SellerStatus {
  Online = 'online',
  Offline = 'Offline',   // 👈 con mayúscula, no coincidía con el back ("offline")
}
```

Nunca se había notado porque hasta ahora nada comparaba `user_status` por valor. Corregido a `'offline'` (minúscula) — necesario para que las comparaciones de esta feature funcionen.

### `sortSellersOnlineFirst` — orden de la tabla

```ts
export const sortSellersOnlineFirst = <T extends { user_status: SellerStatus }>(sellers: T[]): T[] => {
    return [...sellers].sort((a, b) => {
        if (a.user_status === b.user_status) return 0;
        return a.user_status === SellerStatus.Online ? -1 : 1;
    });
};
```

Se aplica en `useSellersListData` (`hooks/sellers/useSellerListData.ts`), así que tanto la tabla (`useSellers`) como la card del Home (`useSellersLinkData`) reciben la lista ya ordenada — nadie más tiene que ordenar de nuevo.

### `countOnlineSellers` — subtítulo de la card del Home

Reemplaza el `onlineCount = 0` mockeado que había quedado como placeholder en la pasada anterior.

### `SellerStatusIndicator` — columna "Estado"

Nuevo componente presentacional: punto de color (`theme.custom.accents.green` / `theme.custom.lightGray`) + label (`STATUS_LABELS`, nuevo en `sellerLabels.ts`, mismo patrón que `ROLE_LABELS`). Se agrega como columna en `SellerColumns.tsx`.

## Decisiones de diseño

### ¿Por qué "online" es un estado persistido y no algo calculado al vuelo?

El schema ya traía `user_status` desde antes (probablemente pensado para esto). Reutilizarlo evita inventar un mecanismo paralelo (por ejemplo, comparar `lastSeenAt` contra un timeout) y mantiene el modelo de datos simple: un vendedor está online si y solo si su sesión sigue activa según el propio backend.

### ¿Por qué el logout no falla si no puede marcar offline?

Si el `Seller` no existiera (caso raro, cuenta a medio borrar) o la escritura fallara por lo que sea, igual hay que invalidar la sesión y limpiar las cookies — eso es lo que "cerrar sesión" significa para quien lo pide. Que ese vendedor quede visualmente "online" un rato de más es un problema menor comparado con que el logout falle.

### ¿Por qué el orden "online primero" se resuelve en el hook y no en el backend?

`GET /seller/get-sellers` ya trae como mucho 100 vendedores (`.limit(100)`, sin paginación real). Ordenar en el cliente es más simple que agregar un `$sort` en el backend para un volumen de datos tan chico, y mantiene la regla de "el join contra Auth es lo único que hace el backend acá" — ordenar es una decisión de presentación.

## Cómo probarlo

Verificado manualmente contra el backend real (Mongo Atlas), con cuentas descartables creadas y borradas después:

1. Crear 2-3 vendedores de prueba, loguear con algunos y no con otros.
2. `GET /seller/get-sellers` (o la tabla en `/sellers`): los logueados aparecen con `user_status: "online"` y arriba de la lista.
3. Cerrar sesión con uno de los online → pasa a `offline` y baja en el orden.
4. Card de "Vendedores" en el Home: el subtítulo "N en línea" coincide con la cantidad de logueados.
5. **Caso "sesión ya abierta de antes":** marcar un vendedor `offline` a mano en la base (simulando que su sesión es de antes de este fix) y pegarle directo a `POST /auth/check-auth` con su cookie — el `user_status` en la respuesta pasa a `"online"` sin haber pasado por `/login`.

### Tests automatizados (frontend)

- `sortSellersOnlineFirst.test.ts` — orden, estabilidad, no-mutación.
- `countOnlineSellers.test.ts` — conteo.
- `useSellerListData.test.ts` — el hook devuelve la lista ya ordenada.
- `useSellersLinkData.test.ts` — el subtítulo refleja el conteo real (ya no mockeado).
- `SellerStatusIndicator.test.tsx` — labels correctos por estado.

### Backend

El proyecto backend no tiene un framework de test configurado (`npm test` → `"Error: no test specified"`). No se agregó uno nuevo para esta feature puntual — se verificó manualmente contra la base real (ver arriba). Si en algún momento se configura Jest/Vitest + Supertest ahí, `login`/`logout`/`loginOrCreateWithGoogle` son los candidatos obvios para cubrir primero.

## Límites conocidos

- **No hay heartbeat ni expiración activa.** `online` se re-confirma cada vez que hay un `check-auth`/`refresh` (bastante seguido, cada ≤5 min si la pestaña sigue abierta), pero si el navegador se cierra o pierde conexión **sin** que corra un logout explícito, no hay ningún proceso que la pase a `offline` cuando el `refresh_token` finalmente venza (1 día, o 30 con "recordarme") — queda `online` hasta ese momento, sin aviso. Es consistente con el alcance pedido ("dejemos lo de tiempo real para después"), pero es la limitación más importante a tener en cuenta.
- **Sesión única implícita.** Si la misma persona loguea desde dos dispositivos y cierra sesión en uno, el modelo actual la marca offline igual, aunque siga logueada en el otro.
- **Costo de escritura en cada `check-auth`/`refresh`.** Antes esas rutas solo leían; ahora escriben en cada llamada. Para el volumen de esta app (un kiosco, no miles de usuarios concurrentes) no es un problema, pero si esto creciera mucho valdría la pena, por ejemplo, solo escribir si el `user_status` actual no es ya `online` (evitar el write cuando no cambia nada).

## Archivos tocados (referencia rápida)

**Backend**
- `models/authModel.ts` — `login`, `loginOrCreateWithGoogle` y `checkAuth` marcan online
- `controllers/auth.controller.ts` — `logout` marca offline (best-effort)

**Frontend**
- `typings/seller/sellerEnums.ts` — fix de casing en `SellerStatus.Offline`
- `typings/seller/sellerLabels.ts` — `STATUS_LABELS`
- `typings/seller/sellerTypes.ts` — `SellerStatusIndicatorProps`
- `modules/sellers/helpers/sortSellersOnlineFirst.ts` — nuevo
- `modules/sellers/helpers/countOnlineSellers.ts` — nuevo
- `modules/sellers/components/SellersList/SellerStatusIndicator.tsx` — nuevo
- `modules/sellers/pages/SellersList/components/SellerColumns.tsx` — columna "Estado"
- `hooks/sellers/useSellerListData.ts` — ordena antes de devolver `sellers`
- `hooks/sellers/useSellersLinkData.ts` — conteo real en vez de mock
