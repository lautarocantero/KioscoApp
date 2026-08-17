# `getNotificationDetailRoute` — Documentación

## ¿Para qué sirve?

Función pura que arma la ruta de detalle a la que apunta la flecha de cada notificación: la venta que la generó (`/sell/:sell_id`) o la presentación cuyo stock quedó por debajo del mínimo (`/products/:product_id/presentation/:presentation_id`).

## Firma

```ts
getNotificationDetailRoute(notification: NotificationEntity): string
```

- `type: "sale"` → `/sell/{payload.sellId}`.
- `type: "low_stock"` → `/products/{payload.productId}/presentation/{payload.presentationId}` — necesita `productId` además de `presentationId` porque la ruta real de detalle de presentación (`PresentationsRoutes.tsx`) está anidada bajo el producto.

## Dónde se usa

`NotificationListItem.tsx` (flecha del dropdown) y `notificationColumns.tsx` (acción "Ver detalle" de la tabla en `/notifications`), vía `handleGoToDetail` en `useNotificationsBell.ts`/`useNotificationsPage.ts`.

## Tests

`src/modules/notifications/test/helpers/getNotificationDetailRoute.test.ts`
