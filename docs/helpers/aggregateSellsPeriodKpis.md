# `aggregateSellsPeriodKpis` — Documentación

## ¿Para qué sirve?

Calcula los 3 KPIs con variación de la banda de contexto de `/sells` — ventas, tickets y ticket promedio — comparando el período elegido contra el período de comparación inmediatamente anterior (mismo largo). También arma `ticketsPerDay` y `productsPerTicket` (promedio de unidades vendidas por ticket, sumando `stock_required` de cada producto).

**"A cobrar" no vive acá** — ver `aggregateSellsPartialsAlert`: es un estado vigente del negocio (una deuda no deja de existir porque quedó fuera del rango de fechas de la banda), no un dato acotado al período.

## Firma

```ts
aggregateSellsPeriodKpis(sells: SellTicketType[], range: SellsPeriodRange): SellsPeriodKpis
```

Cada KPI con variación tiene la forma `{ value, previousValue, variationPct, trend }`. Si `previousValue` es 0 y `value` también, `variationPct` es `0`; si `previousValue` es 0 y `value` no, `variationPct` es `null` (no hay base de comparación real).

## Dónde se usa

`useSellsContextBand` → `SellsKpiGrid.tsx` (vía `formatSellsKpiVariation` para el chip visual).

## Tests

`src/modules/sells/test/helpers/aggregateSellsPeriodKpis.test.ts`
