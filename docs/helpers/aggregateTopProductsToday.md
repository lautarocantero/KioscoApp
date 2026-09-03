# `aggregateTopProductsToday` — Documentación

## ¿Para qué sirve?

Función pura que arma el ranking "Más vendidos hoy" de `/shop`: suma cantidad (`stock_required`) y monto (`price * stock_required`) por producto sobre las ventas de HOY, y devuelve el top N por monto.

El ticket de venta persistido no guarda un subtotal con descuento por línea (solo `price` unitario), así que `price * stock_required` es el único monto real disponible por producto — mismo cálculo que ya usa `createPdfTicket` para la boleta impresa.

## Firma

```ts
aggregateTopProductsToday(todaySells: SellTicketType[], limit = 5): TopProductSummary[]
// TopProductSummary = { productId: string; name: string; quantity: number; amount: number }
```

## Dónde se usa

`useShopDailySummary` (`hooks/shop/useShopDailySummary.ts`), con las ventas de hoy ya filtradas por `filterSellsByPeriodRange`.

## Tests

`src/modules/shop/test/helpers/aggregateTopProductsToday.test.ts`
