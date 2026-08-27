# `aggregateSellsTopSeller` — Documentación

## ¿Para qué sirve?

Devuelve el vendedor con más **monto** vendido en el período (no cantidad de tickets) para el "hecho" del vendedor destacado en la banda de contexto de `/sells`. `null` si no hay ventas.

## Firma

```ts
aggregateSellsTopSeller(sells: SellTicketType[]): { sellerName: string; totalAmount: number } | null
```

## Dónde se usa

`useSellsContextBand` → `SellsFactsStrip.tsx`.

## Tests

`src/modules/sells/test/helpers/aggregateSellsTopSeller.test.ts`
