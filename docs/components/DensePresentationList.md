# DensePresentationList — Documentación

## ¿Para qué sirve?

Vista de lista densa del catálogo de `/new-sell` (una fila por presentación, no por producto) — la vista recomendada para catálogos grandes (150–1000 SKUs). Vive en `ViewMode.Collapsed`, el tercer botón del `ViewModeToggle` que antes no tenía efecto.

## Props (`DensePresentationListProps`)

```ts
interface DensePresentationListProps {
  rows: PresentationRow[];
  onAdd: (presentation: Presentation) => void;
}
```

`rows` viene de `buildPresentationRows` (mismo índice que usa el buscador del header — una sola fuente de aplanado).

## Comportamiento

- Tabla semántica (`<table>`) con columnas Producto / Presentación / SKU / Categoría / Precio+stock / Acciones.
- `minWidth: 880px` + contenedor `overflow-x: auto` — la tabla no se rompe en pantallas angostas, scrollea horizontal en su lugar.

## Ejemplo de uso

```tsx
<DensePresentationList rows={presentationRows} onAdd={handleAddPresentation} />
```

## Ver también

- [DensePresentationRow](./DensePresentationRow.md)
- [buildPresentationRows](../helpers/buildPresentationRows.md)
