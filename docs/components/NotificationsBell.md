# NotificationsBell — Documentación

## 1. ¿Para qué sirve?

Campana de notificaciones de la app: una venta registrada, o una presentación que quedó por debajo de su punto de reposición tras una venta. Vive arriba a la derecha del dashboard, en el `Box` que `AppShell.tsx` tenía reservado ("Reservado para la futura campana de notificaciones", ver [docs/components/SettingsModal.md](./SettingsModal.md) §5) desde que el switch de tema se movió a Ajustes.

Al hacer click abre un dropdown con dos secciones, cada una con su propio scroll:

- **Importante** — solo ventas (`type: "sale"`).
- **Más notificaciones** — solo stock bajo (`type: "low_stock"`).

Un botón "Ver todas las notificaciones" al pie navega a `/notifications`, la tabla completa con filtros.

**¿Dónde se usa?**
- `src/modules/shared/layout/AppShell.tsx`

## 2. Arquitectura

```
NotificationsBell                          (IconButton + Badge, siempre montado)
└── NotificationsDropdown                  (lazy + Suspense, Popover anclado a la campana)
    ├── header: título + "Marcar todas como leídas"
    ├── NotificationsDropdownSection (Importante)
    │   └── NotificationListItem × N
    ├── NotificationsDropdownSection (Más notificaciones)
    │   └── NotificationListItem × N
    └── footer: "Ver todas las notificaciones" → navega a /notifications

NotificationsPage                          (/notifications)
├── NotificationsPageHeader                (ícono + título + subtítulo)
├── NotificationsPageActions               (Marcar todas leídas / Eliminar todas)
├── NotificationsFilterTabs                (Todas / Alertas / Novedades, con contador)
├── DataTable<NotificationEntity>          (mismo componente que el resto de los listados)
│   ├── extraActions: NotificationsPageActions  (en el header de la tabla, mismo look que "+ Nuevo producto")
│   └── notificationColumns.tsx            (type / date / message / status / actions)
└── ConfirmDialog                          (confirmación de "borrar todas")
```

Archivos:

| Archivo | Responsabilidad |
|---|---|
| `modules/shared/components/NotificationsBell/NotificationsBell.tsx` | Ícono + badge, monta el dropdown lazy |
| `modules/shared/components/NotificationsBell/NotificationsDropdown.tsx` | `Popover` con header/secciones/footer |
| `modules/shared/components/NotificationsBell/NotificationsDropdownSection.tsx` | Una sección: título + lista scrolleable + vacío |
| `modules/shared/components/NotificationsBell/NotificationListItem.tsx` | Tarjeta de una notificación (ícono, mensaje, tiempo, ojo, flecha de detalle) |
| `modules/notifications/pages/NotificationsPage/NotificationsPage.tsx` | Página `/notifications` |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageHeader.tsx` | Ícono + título + subtítulo |
| `modules/notifications/pages/NotificationsPage/components/NotificationsPageActions.tsx` | Botones de header (marcar todas / eliminar todas) |
| `modules/notifications/pages/NotificationsPage/components/NotificationsFilterTabs.tsx` | Tabs Todas/Alertas/Novedades con contador |
| `modules/notifications/pages/NotificationsPage/components/notificationColumns.tsx` | Columnas de la tabla |
| `modules/notifications/helpers/getNotificationMessage.ts` | Título/subtítulo del mensaje (compartido bell + tabla) |
| `modules/notifications/helpers/getRelativeTime.ts` | "Hace 5 min" (compartido bell + tabla) |
| `modules/notifications/helpers/groupNotificationsByFilter.ts` / `getNotificationFilterCounts.ts` | Filtro y contadores de los tabs |
| `modules/notifications/helpers/getNotificationDetailRoute.ts` | Ruta de detalle (venta o presentación) de la flecha |
| `modules/notifications/helpers/getGoToDetailLabel.ts` | Texto del tooltip de la flecha ("Ver venta" / "Ver presentación") |
| `modules/shared/components/DataTable/getTableActionButtonSx.ts` | Estilo del botón pill (mismo look que "+ Nuevo producto"), reutilizado por `DataTableToolbar` y por `NotificationsPageActions` |
| `modules/notifications/api/notificationApi.ts` | Requests a `${API_URL}/notification` |
| `hooks/notifications/useNotificationsData.ts` | Fetch + polling (compartido bell + página) |
| `hooks/notifications/useNotificationsBell.ts` | Estado del popover + acciones rápidas |
| `hooks/notifications/useNotificationsPage.ts` | Filtro, columnas, diálogos de borrado |
| `store/notification/{notificationSlice,notificationThunks}.ts` | Estado global + llamadas al back |
| `typings/notifications/{notificationTypes,notificationComponentTypes,notificationEnums}.ts` | Tipos |

## 3. Props

`NotificationsBell` no recibe props (se auto-orquesta con `useNotificationsBell`). Ver `@typings/notifications/notificationComponentTypes` para el resto de los componentes.

## 4. Ejemplo de uso

```tsx
// AppShell.tsx
<Box sx={{ position: "absolute", top: 16, right: 16, zIndex: 10 }}>
  <NotificationsBell />
</Box>
```

## 5. Detalles de implementación

- **Tarjeta por notificación**: cada `NotificationListItem` es un contenedor propio, **solo** el borde izquierdo coloreado por `type` (nunca un borde completo). El fondo es plano (no noisy — el noisy vive únicamente en el `Popover` contenedor, vía `getNoisyBackgroundSx`): no leída = un velo blanco translúcido (`alpha(theme.custom.white, 0.1)`) por encima del noisy del contenedor; leída = **transparente**, así se ve exactamente el mismo color que el contenedor sin tener que adivinar qué token "es más claro" en cada tema (los nombres `lightBackground`/`darkBackground` no son simétricos entre el tema claro y el oscuro — en el claro, `lightBackground` ya es el fondo general de la app, no un tono intermedio — por eso el enfoque anterior con tokens fijos daba colores raros). El único cambio entre leída/no leída es de color — nunca de `fontWeight`.
- **80% mensaje / 20% tiempo + acciones, sin truncar**: dentro de la tarjeta, el título ocupa `flex: '1 1 80%'` **sin** `noWrap` — envuelve en tantas líneas como haga falta para mostrarse completo, la tarjeta crece en alto lo que sea necesario. La columna angosta a la derecha (`flex: '0 0 20%'`) apila el tiempo relativo arriba y las dos acciones (ojo, flecha) abajo, alineadas arriba (`alignItems: "flex-start"`) para acompañar un mensaje de varias líneas. Los botones de acción son `size="small"` con ícono `1.25rem` y `p: 0.5` (más grandes que la primera pasada, que quedó demasiado chica).
- **Toggle de lectura bidireccional**: clickear en cualquier parte de la tarjeta (o el botón de ojo) invierte el estado actual (`not-read-yet` ↔ `readed`), vía `setNotificationReadStatusThunk`. La tarjeta es un `Box role="button"` con soporte de teclado (Enter/Espacio); los botones de acción hacen `stopPropagation` para no togglear dos veces.
- **Acciones con tooltip**: ojo (marcar leída/no leída) y flecha (ir al detalle) llevan `Tooltip` — el de la flecha es contextual (`getGoToDetailLabel`: "Ver venta" o "Ver presentación", no un genérico "Ver detalle"). Se reutilizan en la tabla de `/notifications` vía `RowActionsCell` (`onToggleRead`/`isRead`/`toggleReadLabel` y `onGoToDetail`/`goToDetailLabel` opcionales, ya con `Tooltip` incluido), el único componente de acciones de fila del repo — en vez de crear uno paralelo.
- **Colores**: siempre `theme.custom.*`/`theme.palette.*`, nunca hex — `accents.gold` para stock bajo, `accents.green`/`palette.success` para ventas, mismo patrón que `getSeverityColor` en `ShopLowStockList.tsx`.
- **"Marcar todas como leídas"**: solo se muestra si `unreadCount > 0` (no tiene sentido ofrecerlo si no hay nada para marcar). Ese texto y "Ver todas las notificaciones" usan `theme.typography.caption.fontSize` (la más chica del theme) — son acciones secundarias, no deben competir visualmente con el contenido.
- **Acciones de la tabla, mismo look que "+ Nuevo producto"**: `NotificationsPageActions` (Marcar todas leídas / Eliminar todas) se monta vía el nuevo slot `extraActions` de `DataTable`/`DataTableHeader`/`DataTableToolbar` (prop opcional, no rompe ningún uso existente), en el mismo lugar donde otras tablas muestran su botón de "nuevo registro". Ambos botones comparten el estilo pill con el botón `newItem` de `DataTableToolbar` vía `getTableActionButtonSx(theme, color)` — `secondary` para marcar todas, `error` para eliminar todas — para no duplicar el `sx`.
- **Filtros y acciones en la misma fila**: `extraActions` recibe un único `Box` (`justifyContent: "space-between"`, `width: "100%"`) con `NotificationsFilterTabs` a la izquierda y `NotificationsPageActions` a la derecha — para que el wrapper interno de `DataTableToolbar` le ceda todo el ancho de la fila (`flex: 1` cuando no hay `search`/`newItem`), en vez de encogerse al contenido y dejar los tabs en una fila aparte.
- **Columna "Estado" de la tabla, igual que presentaciones**: en vez de un render a medida (dot + texto), la columna usa el helper compartido `chipColumn` (`modules/shared/components/DataTable/ColumnHelpers.tsx`, el mismo que arma la columna "Estado" de `presentationColumns.tsx`) — `Chip` `size="small"` `variant="filled"`, color `primary` si no está leída, `default` si lo está.
- **Carga diferida**: `NotificationsDropdown` se importa con `React.lazy` + `Suspense`, montado solo mientras el popover está abierto — mismo patrón que `SettingsModal`. `NotificationsBell` en sí no es lazy (es chico y siempre visible).
- **Polling**: `useNotificationsData` re-consulta cada 45s mientras esté montada (campana o página). Además, `useCart.ts` dispara un fetch inmediato después de una venta exitosa para que quien vendió vea su propia notificación sin esperar al polling.
- **i18n**: toda la sección usa `react-i18next` (namespace `notifications.*` en `src/i18n/locales/{es,en}.ts`), incluidos los mensajes interpolados (`{{productName}}`, `{{sellerName}}`, etc.).
- **Tema claro/oscuro**: no hay lógica de tema propia — todo llega vía `theme.custom`/`theme.palette`, así que sigue automáticamente el `ThemeProvider` global.
- **Accesibilidad**: `Popover` con `aria-labelledby`; cada sección es un `<section aria-label>`; la tarjeta lleva `aria-label` con el mensaje + estado, foco visible (`:focus-visible`) y manejo de teclado; los botones de ojo/flecha llevan `aria-label` traducido; los tabs de filtro usan `role="tablist"`/`role="tab"`/`aria-selected`.
- **Contrato con el backend**: ver [docs/features/notifications.md](../features/notifications.md) para el detalle completo de los endpoints y de cómo/cuándo se crean las notificaciones.

## 6. Tests

- `src/hooks/notifications/test/useNotificationsData.test.ts`
- `src/hooks/notifications/test/useNotificationsBell.test.ts`
- `src/hooks/notifications/test/useNotificationsPage.test.ts`
- `src/modules/notifications/test/helpers/getNotificationMessage.test.ts`
- `src/modules/notifications/test/helpers/getRelativeTime.test.ts`
- `src/modules/notifications/test/helpers/groupNotificationsByFilter.test.ts`
- `src/modules/notifications/test/helpers/getNotificationFilterCounts.test.ts`
- `src/modules/notifications/test/helpers/getNotificationDetailRoute.test.ts`
- `src/modules/notifications/test/helpers/getGoToDetailLabel.test.ts`
- `src/modules/notifications/test/NotificationsPage/notificationColumns.test.tsx`
- `src/modules/notifications/test/NotificationsPage/NotificationsPageActions.test.tsx`
- `src/modules/shared/test/NotificationsBell/NotificationListItem.test.tsx`
