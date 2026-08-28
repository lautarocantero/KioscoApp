# `getPresentationStockStatus` — Documentación

## ¿Para qué sirve?

Semáforo de stock reutilizado en el dropdown de búsqueda, las filas inline de la card de producto y la lista densa de `/new-sell`. Reusa `min_stock` (el mismo umbral configurable que ya usa `/shop` para el reporte de reposición) en vez de un número fijo, para no duplicar la regla de "stock bajo".

> No confundir con `stockHandler.getStockStatus` (el chip de stock del `ProductDialog`): ese helper no tiene noción de venta por peso y devuelve colores semánticos de MUI (`error`/`warning`/`success`), no tokens del theme ni labels traducidos. Son dos problemas distintos con el mismo nombre "de familia" — por eso este vive con el nombre completo.

## Firma

```ts
getPresentationStockStatus(
  stock: number,
  minStock: number,
  isWeight: boolean,
  t: TFunction
): { status: StockStatus; label: string }

isAddDisabled(stock: number, isWeight: boolean): boolean
```

## Reglas

| Condición | `status` |
| --- | --- |
| `isWeight` | `StockStatus.Weight` (el stock siempre alcanza para vender algo de peso) |
| `stock <= minStock` | `StockStatus.Low` |
| resto | `StockStatus.Ok` |

`isAddDisabled` es `true` solo cuando `stock <= 0` y la presentación **no** es por peso — venta por peso nunca se deshabilita.

## Ejemplo

```tsx
const { status, label } = getPresentationStockStatus(row.stock, row.minStock, row.isWeight, t);
// status → mapear a color de theme en el componente (custom.accents.orange / custom.darkSecondary / custom.darkWhite)
```

El mapeo de `status` a color de theme se resuelve en cada componente (no acá, para no importar `Theme` en un helper puro).
