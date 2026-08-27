# `aggregateSellsPeakHour` — Documentación

## ¿Para qué sirve?

Agrupa las ventas del período en franjas de 2 horas (0–2, 2–4, ..., 22–24) y devuelve la franja con más tickets junto con la proporción del total que representa (p. ej. "18–20 h · 1 de cada 4 tickets", ver `formatSellsPeakHourRatio` para el "1 de cada N"). `null` si no hay ventas.

## Firma

```ts
aggregateSellsPeakHour(sells: SellTicketType[]): { startHour: number; endHour: number; ticketSharePct: number } | null
```

## Dónde se usa

`useSellsContextBand` → `SellsFactsStrip.tsx`.

## Tests

`src/modules/sells/test/helpers/aggregateSellsPeakHour.test.ts`
