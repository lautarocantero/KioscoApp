# `aggregateSellsPartialsAlert` — Documentación

## ¿Para qué sirve?

Calcula la cantidad, el monto pendiente (`total_amount - amount_paid`) y la antigüedad de la deuda más vieja entre las ventas parciales sin saldar (`status === Parcial` y `settled_by_sell_id === null`). Se calcula sobre **todo el historial**, no sólo el período elegido en la banda: una deuda no deja de existir porque quedó fuera del rango de fechas de 7 días.

Alimenta tanto la barra de alerta de parciales como el 4to KPI ("A cobrar") de la banda de contexto de `/sells`.

## Firma

```ts
aggregateSellsPartialsAlert(sells: SellTicketType[], now: Date): SellsPartialsAlertSummary
// { count: number; totalAmount: number; oldestDebtDays: number | null }
```

`amount_paid: null` se trata como `0` al calcular el saldo pendiente.

## Dónde se usa

`useSellsContextBand` → `SellsKpiGrid.tsx` y `SellsPartialsAlertBar.tsx`.

## Tests

`src/modules/sells/test/helpers/aggregateSellsPartialsAlert.test.ts`
