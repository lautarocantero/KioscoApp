# `formatSellsPeakHourRatio` — Documentación

## ¿Para qué sirve?

Convierte el porcentaje de tickets de la franja pico (`aggregateSellsPeakHour().ticketSharePct`) a la forma "1 de cada N" que pide el handoff ("18–20 h · 1 de cada 4 tickets").

## Firma

```ts
formatSellsPeakHourRatio(ticketSharePct: number): number
```

`ticketSharePct <= 0` devuelve `0` (sin división por cero).

## Dónde se usa

`SellsFactsStrip.tsx`.

## Tests

`src/modules/sells/test/helpers/formatSellsPeakHourRatio.test.ts`
