# `getNotificationFilterCounts` — Documentación

## ¿Para qué sirve?

Función pura que cuenta cuántas notificaciones caen en cada tab de `/notifications` ("Todas (8) / Alertas (3) / Novedades (5)"), a partir de la lista completa sin filtrar.

## Firma

```ts
getNotificationFilterCounts(items: NotificationEntity[]): Record<NotificationFilterEnum, number>
```

## Dónde se usa

`useNotificationsPage.ts`, para los contadores de `NotificationsFilterTabs`.

## Tests

`src/modules/notifications/test/helpers/getNotificationFilterCounts.test.ts`
