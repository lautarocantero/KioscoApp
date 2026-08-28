# ProductItemPresentationRow — Documentación

## ¿Para qué sirve?

Una fila de presentación dentro de la card de un producto en la grilla de `/new-sell`: nombre de la variante, semáforo de stock, precio y botón `+` para agregar directo al carrito sin abrir el `ProductDialog`.

## Props (`ProductItemPresentationRowProps`)

```ts
interface ProductItemPresentationRowProps {
  presentation: Presentation;
  onAdd: (presentation: Presentation) => void;
}
```

## Comportamiento

- El semáforo de stock viene de `getPresentationStockStatus` (mismo helper que el dropdown de búsqueda y la lista densa).
- El botón `+` se deshabilita con `isAddDisabled` — sin stock y no es venta por peso.

## Ejemplo de uso

```tsx
<ProductItemPresentationRow presentation={presentation} onAdd={handleAddPresentation} />
```
