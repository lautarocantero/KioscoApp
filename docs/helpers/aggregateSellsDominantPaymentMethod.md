# `aggregateSellsDominantPaymentMethod` — Documentación

## ¿Para qué sirve?

Devuelve el medio de pago (`PaymentMethod`) con más ventas del período elegido en la banda de contexto de `/sells`, y qué porción del total representa (p. ej. "Efectivo · 52% de las ventas"). `null` si no hay ventas.

## Firma

```ts
aggregateSellsDominantPaymentMethod(sells: SellTicketType[]): { method: PaymentMethod; sharePct: number } | null
```

## Dónde se usa

`useSellsContextBand` → `SellsFactsStrip.tsx`.

## Tests

`src/modules/sells/test/helpers/aggregateSellsDominantPaymentMethod.test.ts`
