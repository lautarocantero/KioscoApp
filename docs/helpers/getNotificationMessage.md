# `getNotificationMessage` — Documentación

## ¿Para qué sirve?

Función pura que arma el título/subtítulo cortos de una notificación vía `i18next` (`t()`), a partir de su `type` y `payload`. Se comparte entre `NotificationListItem` (campana) y `buildColumnsForNotifications` (tabla de `/notifications`) para no duplicar el armado del mensaje en dos lugares.

- `type: "low_stock"` → `"{{productName}} necesita reposición ({{units}} unidades)"` + subtítulo con el detalle del mínimo.
- `type: "sale"` → `"{{sellerName}} ha realizado una venta por {{amount}}"` (monto formateado con `formatCurrency`, `src/modules/cart/helpers/formatCurrency.ts` — el mismo formateador que usa el carrito) + subtítulo fijo.

## Firma

```ts
getNotificationMessage(notification: NotificationEntity, t: TFunction): NotificationMessage
// NotificationMessage = { title: string; subtitle: string }
```

## Dónde se usa

- `NotificationListItem.tsx` (dropdown de la campana)
- `notificationColumns.tsx` (columna "message" y título del diálogo de borrado en `/notifications`)

## Tests

`src/modules/notifications/test/helpers/getNotificationMessage.test.ts`
