# `aggregateActiveSellersToday` — Documentación

## ¿Para qué sirve?

Función pura que arma "En el mostrador ahora" de `/shop`: lista TODOS los vendedores actualmente online (`user_status === SellerStatus.Online`, dato real de `useSellersListData`), con lo que vendieron HOY (0 si todavía no vendieron nada en su turno).

A diferencia de un ranking de "top vendedores del mes", acá no se filtra por quién más vendió — se lista a todo el que está online ahora mismo, ordenado de mayor a menor venta de hoy.

## Firma

```ts
aggregateActiveSellersToday(todaySells: SellTicketType[], sellers: Seller[]): ActiveSellerSummary[]
// ActiveSellerSummary = { sellerId: string; sellerName: string; status: SellerStatus; totalAmount: number; ordersCount: number }
```

## Dónde se usa

`useShopDailySummary` (`hooks/shop/useShopDailySummary.ts`), con las ventas de hoy ya filtradas por `filterSellsByPeriodRange` y `state.seller.sellers`.

## Tests

`src/modules/shop/test/helpers/aggregateActiveSellersToday.test.ts`
