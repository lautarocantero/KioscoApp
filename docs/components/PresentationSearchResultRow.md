# PresentationSearchResultRow — Documentación

## ¿Para qué sirve?

Una fila del dropdown de `PresentationSearchBar`: producto + presentación, chip de categoría, sku, precio + semáforo de stock, botón `+`. Puramente presentacional.

## Props (`PresentationSearchResultRowProps`)

```ts
interface PresentationSearchResultRowProps {
  row: PresentationRow;
  isHighlighted: boolean;
  onSelect: (row: PresentationRow) => void;
  onMouseEnter: () => void;
}
```

## Comportamiento

- El semáforo de stock (color + label) viene de `getPresentationStockStatus` (helper compartido con la lista densa y las filas inline de la card).
- El botón `+` y el click en la fila se deshabilitan con `isAddDisabled(row.stock, row.isWeight)` — sin stock y no es venta por peso.
- `isHighlighted` resalta la fila (navegación por teclado) con un fondo violeta translúcido.
- `role="option"` + `aria-selected` para que el dropdown sea navegable con lector de pantalla.

## Ejemplo de uso

```tsx
<PresentationSearchResultRow
  row={row}
  isHighlighted={index === highlightedIndex}
  onSelect={onSelect}
  onMouseEnter={() => onHighlight(index)}
/>
```
