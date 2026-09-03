# `aggregateSellsByDay` — Documentación

## ¿Para qué sirve?

Función pura que arma una serie continua de los últimos N días (por defecto 7, usada por el gráfico de ventas de `/shop`) sumando `total_amount` de las ventas reales de cada día. Días sin ventas quedan con `total: 0` — no se rellenan con datos inventados, es la suma real (que puede ser cero).

Usa la fecha **local** (no UTC) para agrupar, para que una venta cerca de medianoche quede en el día que el usuario espera ver.

## Firma

```ts
aggregateSellsByDay(sells: SellTicketType[], days: number): DailySalesPoint[]
// DailySalesPoint = { date: string; label: string; total: number }
```

- `date`: clave `YYYY-MM-DD` en horario local.
- `label`: fecha corta en español para el eje X del gráfico (ej. `"12 ago"`).
- `days <= 0` devuelve `[]`.

## Dónde se usa

`useSellsContextBand` (`hooks/sells/useSellsContextBand.ts`) para el sparkline de 14 días de `/sells`, con `state.sell.sells` (poblado por `useSellsListData`).

## Tests

`src/modules/shop/test/helpers/aggregateSellsByDay.test.ts`
