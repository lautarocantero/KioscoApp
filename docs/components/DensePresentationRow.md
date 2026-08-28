# DensePresentationRow — Documentación

## ¿Para qué sirve?

Una fila (`<tr>`) de `DensePresentationList`: producto, presentación, sku, categoría, precio + semáforo de stock, y botón `+` para agregar directo al carrito.

## Props (`DensePresentationRowProps`)

```ts
type DensePresentationRowProps = {
  row: PresentationRow;
} & { onAdd: (presentation: Presentation) => void };
```

## Comportamiento

Mismo semáforo (`getPresentationStockStatus`) y misma regla de deshabilitado (`isAddDisabled`) que `ProductItemPresentationRow` y `PresentationSearchResultRow` — un solo lugar con la regla de negocio, tres presentaciones visuales distintas.

## Ejemplo de uso

```tsx
<DensePresentationRow row={row} onAdd={onAddPresentation} />
```
