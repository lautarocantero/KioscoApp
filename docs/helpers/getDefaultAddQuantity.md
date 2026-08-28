# `getDefaultAddQuantity` — Documentación

## ¿Para qué sirve?

Cantidad por defecto al agregar una presentación de un solo click (buscador del header, fila inline de la card, lista densa): `1` unidad, o `100` (un paso en gramos) si es venta por peso. Vive en `saleTypeHelper.ts`, junto al resto de la lógica de venta por peso/unidad.

## Firma

```ts
getDefaultAddQuantity(saleType?: string): number
```

## Ejemplo

```ts
getDefaultAddQuantity("unit");   // 1
getDefaultAddQuantity("weight"); // 100
```

## Dónde se usa

`usePresentationSearch` y `useProductItem.handleAddPresentation` — cualquier flujo de alta "de un click" que no pide cantidad exacta al usuario.
