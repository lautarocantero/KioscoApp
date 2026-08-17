# `groupNotificationsByFilter` — Documentación

## ¿Para qué sirve?

Función pura que filtra la lista de notificaciones según el tab activo de `/notifications`: `all` (todas), `alerts` (solo `low_stock`) o `news` (solo `sale`).

## Firma

```ts
groupNotificationsByFilter(items: NotificationEntity[], filter: NotificationFilterEnum): NotificationEntity[]
```

## Dónde se usa

`useNotificationsPage.ts`, para calcular `rows` según el `filter` activo.

## Tests

`src/modules/notifications/test/helpers/groupNotificationsByFilter.test.ts`
