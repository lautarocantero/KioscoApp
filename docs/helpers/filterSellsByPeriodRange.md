# `filterSellsByPeriodRange` — Documentación

## ¿Para qué sirve?

Filtro de fechas puro y reutilizado tanto por `aggregateSellsPeriodKpis` (rango actual + rango de comparación) como por `useSellsContextBand` para los "hechos" (medio dominante, hora pico, vendedor) del período elegido. Existe para no duplicar la misma comparación de timestamps en varios lugares.

## Firma

```ts
filterSellsByPeriodRange(sells: SellTicketType[], from: Date, to: Date): SellTicketType[]
```

Bordes inclusive: una venta con `purchase_date === from` o `purchase_date === to` queda incluida.

## Tests

`src/modules/sells/test/helpers/filterSellsByPeriodRange.test.ts`
