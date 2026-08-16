# `getLowStockPresentations` — Documentación

## ¿Para qué sirve?

Función pura que filtra presentaciones reales (`stock < min_stock`) y las clasifica por severidad para la lista de "Productos con stock bajo" de `/shop`.

## Firma

```ts
getLowStockPresentations(presentations: Presentation[]): LowStockPresentationSummary[]
```

- Excluye las que tienen `stock >= min_stock` (no están bajas).
- `severity`: `Critico` si `stock <= 0` (incluye stock negativo — una venta que dejó el stock en rojo), `Bajo` si queda algo pero menos del mínimo.
- `ratio`: `stock / min_stock`, acotado a `[0, 1]` (nunca negativo, para no romper la barra de progreso con stock negativo). `0` si `min_stock` es `0` (nunca se considera "bajo" sin mínimo configurado — queda excluido antes por el filtro).
- Ordena por `ratio` ascendente (más crítico primero); en empate en `0`, por `stock` ascendente (el más negativo primero).

## Dónde se usa

`useShopLowStockPresentations` (`hooks/shop/useShopLowStockPresentations.ts`).

## Tests

`src/modules/shop/test/helpers/getLowStockPresentations.test.ts`
