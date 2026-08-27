# `buildSellsPeriodRange` — Documentación

## ¿Para qué sirve?

Función pura que arma el rango `[from, to]` del período elegido en la banda de contexto de `/sells` (`Hoy` / `7 días` / `30 días` / `Este mes`) y su rango de comparación inmediatamente anterior. "Este mes" compara contra el mes calendario anterior completo (no contra "los mismos N días antes"), porque los meses no tienen todos el mismo largo.

## Firma

```ts
buildSellsPeriodRange(period: SellsPeriodEnum, now: Date): SellsPeriodRange
// SellsPeriodRange = { from: Date; to: Date; compareFrom: Date; compareTo: Date }
```

## Dónde se usa

`useSellsContextBand` (`hooks/sells/useSellsContextBand.ts`) y `getSellsPeriodOptionAvailability`, que reusa `from` para saber si un período cruza al mes anterior.

## Tests

`src/modules/sells/test/helpers/buildSellsPeriodRange.test.ts`
