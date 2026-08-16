# `aggregateTopSellers` — Documentación

## ¿Para qué sirve?

Función pura que rankea vendedores por ventas del **mes en curso**, agregando las ventas reales (`sells`) por `seller_id`: suma `total_amount` → `totalAmount`, cuenta ventas → `ordersCount`. Cruza con la lista de vendedores para traer su `status` (online/offline) real.

No inventa "clientes" ni "conversión" — esos datos no existen en ningún endpoint del backend, así que `TopSellerSummary` no los incluye (ver [docs/features/shopDashboard.md](../features/shopDashboard.md) para el detalle de qué se omitió y por qué).

## Firma

```ts
aggregateTopSellers(sells: SellTicketType[], sellers: Seller[], limit: number): TopSellerSummary[]
// TopSellerSummary = { sellerId, sellerName, totalAmount, ordersCount, status: SellerStatus }
```

- Filtra ventas al mes calendario actual (según `purchase_date`).
- Ordena descendente por `totalAmount` y corta en `limit`.
- El `status` se resuelve así: **1)** match por `seller_id` exacto; **2)** si no hay match, fallback por `seller_name` (cubre cuentas de test recreadas — mismo nombre, `_id` nuevo — donde el `seller_id` guardado en la venta quedó desactualizado); **3)** si tampoco matchea por nombre, `SellerStatus.Offline` por defecto. El match por id siempre gana sobre el de nombre.

## Dónde se usa

`useShopSalesSummary` (`hooks/shop/useShopSalesSummary.ts`), para el panel "Vendedores destacados" de `/shop`.

## Tests

`src/modules/shop/test/helpers/aggregateTopSellers.test.ts`
