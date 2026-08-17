# 🪝 `useNotificationsPage`

> Orquesta la página `/notifications`: filtro por tab, columnas de la tabla y los diálogos de borrado (individual y "borrar todas").

## 🎯 ¿Para qué sirve?

- `filter`/`setFilter` (`NotificationFilterEnum`), `counts` (conteo por tab) y `rows` (lista ya filtrada), vía los helpers puros `groupNotificationsByFilter`/`getNotificationFilterCounts`.
- `columns`: arma `buildColumnsForNotifications` con los callbacks de borrado/lectura ya resueltos.
- Diálogo de borrado individual: mismo patrón que `useProviders.ts` (`DeleteDialogState`/`CLOSED_DIALOG`), disparado desde la acción "Eliminar" de la fila.
- Diálogo de "borrar todas": booleano simple + `ConfirmDialog` (no reutiliza el slot `deleteDialog` de `DataTable`, que está pensado para un solo registro).
- `handleMarkAllAsRead`: igual que en la campana, marca todas como leídas.

## 📦 Firma

```ts
useNotificationsPage(): UseNotificationsPageReturn
```

Ver `@typings/notifications/notificationTypes` para el shape completo del retorno.

## Tests

`src/hooks/notifications/test/useNotificationsPage.test.ts`
