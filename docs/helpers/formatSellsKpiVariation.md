# `formatSellsKpiVariation` — Documentación

## ¿Para qué sirve?

Traduce la variación calculada por `aggregateSellsPeriodKpis` al chip visual de la banda de contexto de `/sells`: una baja **no** es un chip de error (rojo) — es neutro con flecha hacia abajo, siguiendo el criterio del handoff ("una baja semanal no es un error").

## Firma

```ts
formatSellsKpiVariation(kpi: SellsPeriodKpi): { label: string; tone: "positive" | "attention" | "neutral" }
```

- `trend: "up"` → `▲ N%`, tono `positive` (verde).
- `trend: "down"` → `▼ N%`, tono `neutral` (no rojo).
- `trend: "flat"` → `N%`, tono `neutral`.
- `variationPct === null` → `—`, tono `neutral`.

## Dónde se usa

`SellsKpiGrid.tsx`.

## Tests

`src/modules/sells/test/helpers/formatSellsKpiVariation.test.ts`
