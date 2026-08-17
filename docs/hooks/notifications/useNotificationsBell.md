# 🪝 `useNotificationsBell`

> Orquesta la campana de notificaciones: apertura/cierre del dropdown, separación en secciones y las acciones rápidas.

## 🎯 ¿Para qué sirve?

- Estado de apertura del `Popover` (`anchorEl`/`open`), vía `handleOpen`/`handleClose`.
- Deriva de `useNotificationsData()` dos listas ya separadas: `importantNotifications` (`type: "sale"`) y `alertNotifications` (`type: "low_stock"`) — la campana **no** filtra por leído/no leído, muestra todas.
- `unreadCount`: total de notificaciones en `status: "not-read-yet"`, para el badge del ícono.
- `handleToggleRead(_id, currentStatus)`: bidireccional — invierte el estado actual (`not-read-yet` ↔ `readed`). El llamador (la tarjeta completa, o el botón de ojo) manda el estado que tiene ahora mismo la notificación.
- `handleGoToDetail(notification)`: navega al detalle de la venta o de la presentación (`getNotificationDetailRoute`) y cierra el popover.
- `handleMarkAllAsRead()` / `handleViewAll()`: marcar todas como leídas y navegar a `/notifications` (cerrando el popover).

## 📦 Firma

```ts
useNotificationsBell(): UseNotificationsBellReturn
```

Ver `@typings/notifications/notificationTypes` para el shape completo del retorno.

## 💡 Ejemplo

```tsx
const { anchorEl, open, unreadCount, handleOpen, handleClose, ... } = useNotificationsBell();

<IconButton onClick={handleOpen}>
  <Badge badgeContent={unreadCount}><NotificationsIcon /></Badge>
</IconButton>
```

## Tests

`src/hooks/notifications/test/useNotificationsBell.test.ts`
