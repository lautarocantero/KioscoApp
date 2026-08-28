# `buildPresentationRows` — Documentación

## ¿Para qué sirve?

Aplana los productos ya cargados en `state.cart.products` (cada uno con su array `presentations` embebido) a un índice de **una fila por presentación** (`PresentationRow`). No hace ningún fetch — opera sobre datos que `useSellerProductsListData` ya trajo.

## Firma

```ts
buildPresentationRows(products: Product[], t: TFunction): PresentationRow[]
```

Cada `PresentationRow` incluye los campos ya formateados para mostrar (`product`, `presentation`, `category`), los crudos para ordenar/filtrar (`sku`, `price`, `stock`, `minStock`, `isWeight`), y `presentationData` con la `Presentation` completa (para poder agregarla al carrito con todos sus campos).

## Ejemplo

```ts
const rows = buildPresentationRows(products, t);
// [{ key: "prod1:pres1", product: "Coca Cola", presentation: "Botella, 500", ... }]
```

## Dónde se usa

- `usePresentationSearch` — índice sobre el que busca el dropdown del header.
- Vista de lista densa (`ViewMode.Collapsed`) en `useProductsExhibitor`.
