# 🗄️ `notification`

> Documentación del slice de notificaciones y los thunks asociados.

## 🎯 ¿Para qué sirve?

Gestiona la lista de notificaciones (venta registrada, stock bajo) que ve el usuario autenticado, con su estado de lectura ya resuelto por el backend para ese usuario (`status: "not-read-yet" | "readed"`, ver [docs/features/notifications.md](../features/notifications.md)).

## 📦 Archivos

- `src/store/notification/notificationSlice.ts`
- `src/store/notification/notificationThunks.ts`

## 💡 Contenido

### `notificationSlice.ts`

- Estado inicial (`NotificationState`): `items: []`, `loading: false`, `errorMessage: null`.
- Reducers:
  - `checkingNotifications()`
  - `setNotifications(items)`
  - `setNotificationsError(message)`
  - `setNotificationStatusLocal({ _id, status })` — update optimista de una notificación
  - `setAllNotificationsStatusLocal(status)` — update optimista de todas
  - `removeNotificationLocal(_id)` / `clearAllNotificationsLocal()` — update optimista de borrado
- Exporta `RootState`, `AppDispatch` y el reducer por defecto.

### `notificationThunks.ts`

- `fetchNotificationsThunk()` — `GET /notification/get-notifications`.
- `markNotificationAsReadThunk({ _id, status })` / `markAllNotificationsAsReadThunk(status)` — optimistas: el reducer local se actualiza al toque, y si el request falla se resincroniza pidiendo la lista de nuevo (`resyncNotifications`) en vez de llevar un snapshot manual para hacer rollback.
- `deleteNotificationThunk({ _id })` / `deleteAllNotificationsThunk()` — mismo patrón optimista + resync.
- Todos usan `handleError` (`store/shared/handlerStoreError.ts`) como el resto de los thunks del repo.

## ✨ Beneficios

- 🔁 **UI optimista sin duplicar lógica de rollback**: un solo helper (`resyncNotifications`) cubre los cuatro casos de falla.
- 👀 **El front nunca calcula "leído por quién"**: el `status` que expone el back ya viene resuelto para el usuario autenticado (ver contrato en `docs/features/notifications.md`).
