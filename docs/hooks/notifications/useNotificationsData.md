# 🪝 `useNotificationsData`

> Hook de datos: trae y mantiene actualizada la lista de notificaciones del usuario autenticado.

## 🎯 ¿Para qué sirve?

Fuente única de la lista de notificaciones (`state.notification.items`). Dispara `fetchNotificationsThunk()` al montar y cada 45s mientras el componente que lo usa siga montado (polling simple — no hay WebSockets), para que las notificaciones creadas por otros vendedores (u otra pestaña) lleguen sin recargar la página.

Lo usan tanto `useNotificationsBell` (campana, siempre montada en `AppShell`) como `useNotificationsPage` (tabla de `/notifications`) — cada uno dispara su propio polling independiente mientras esté montado.

## 📦 Firma

```ts
useNotificationsData(): { items: NotificationEntity[]; loading: boolean; error: string | null }
```

## 💡 Ejemplo

```ts
const { items, loading, error } = useNotificationsData();
```

## Tests

`src/hooks/notifications/test/useNotificationsData.test.ts`
