# `formatSellsPeriodRangeLabel` — Documentación

## ¿Para qué sirve?

Arma el texto de rango + comparación que se muestra junto al selector de período de la banda de contexto de `/sells` (p. ej. "25/08 – 31/08 · comparado con la semana anterior"). El texto de comparación depende del período elegido, por eso el mapeo por `SellsPeriodEnum` contra las claves `sells.contextBand.period.comparison.*`.

## Firma

```ts
formatSellsPeriodRangeLabel(period: SellsPeriodEnum, range: SellsPeriodRange, t: TFunction): string
```

## Dónde se usa

`SellsListPage.tsx`.

## Tests

`src/modules/sells/test/helpers/formatSellsPeriodRangeLabel.test.ts`
