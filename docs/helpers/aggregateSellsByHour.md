# `aggregateSellsByHour` — Documentación

## ¿Para qué sirve?

Función pura que arma el gráfico "Ventas por hora" del resumen del día de `/shop`: agrupa las ventas de HOY (ya filtradas por el caller) en franjas de 1 hora, sumando `total_amount`. Muestra las últimas 11 horas transcurridas del día, terminando en la hora actual — no un horario comercial fijo (cada negocio abre distinto) ni las 24 horas completas (la mayoría estaría vacía a media mañana).

## Firma

```ts
aggregateSellsByHour(todaySells: SellTicketType[], now: Date): HourlySalesPoint[]
// HourlySalesPoint = { hour: number; label: string; total: number }
```

- `hour`: 0-23, hora local.
- `label`: hora con cero a la izquierda (ej. `"09"`).
- Horas sin ventas quedan con `total: 0`.
- Nunca devuelve horas negativas (clamp a 0 cerca de la medianoche).

## Dónde se usa

`useShopDailySummary` (`hooks/shop/useShopDailySummary.ts`), con las ventas de hoy ya filtradas por `filterSellsByPeriodRange`.

## Tests

`src/modules/shop/test/helpers/aggregateSellsByHour.test.ts`
