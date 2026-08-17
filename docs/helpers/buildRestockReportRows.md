# `buildRestockReportRows` — Documentación

## ¿Para qué sirve?

Función pura que arma las filas de la boleta de reposición (PDF) de `/shop`: todas las presentaciones reales por debajo de su stock mínimo, con el nombre del producto padre y la cantidad mínima a comprar para llegar justo al mínimo.

## Firma

```ts
buildRestockReportRows(presentations: Presentation[], products: Product[]): RestockReportRow[]
```

- Excluye las presentaciones con `stock >= min_stock` (mismo filtro que `getLowStockPresentations`), sin recortar a un top N — la boleta lista todas.
- `productName`: resuelto vía `product_id` contra `products` (el catálogo completo, no el filtrado por stock); queda `""` si no hay match.
- `minRestock`: `min_stock - stock`, nunca negativo — si el stock está sobrevendido (negativo), suma el faltante completo hasta el mínimo.
- `provider1`/`provider2`: siempre `""` — todavía no hay proveedores asociados a presentaciones.
- Ordena igual que `getLowStockPresentations`: por ratio `stock/min_stock` ascendente (más crítico primero), y en empate por `stock` ascendente.

## Dónde se usa

`useShopRestockReport` (`hooks/shop/useShopRestockReport.ts`), junto con `createRestockReportPdf` para generar el PDF descargable.

## Tests

`src/modules/shop/test/helpers/buildRestockReportRows.test.ts`
