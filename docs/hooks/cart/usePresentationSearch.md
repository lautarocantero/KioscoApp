# 🪝 `usePresentationSearch`

> Hook del buscador de presentaciones del header de `/new-sell`.

## 🎯 ¿Para qué sirve?

Reemplaza el flujo "abrir `ProductDialog` → buscar la presentación en la tabla → agregar" por un buscador con autocompletado a nivel **presentación**. El índice se deriva de `state.cart.products` (ya cargado por `useSellerProductsListData`, sin fetch nuevo) con `buildPresentationRows`, se filtra con `searchPresentationRows`, y el alta al carrito reusa el mismo pipeline que el `ProductDialog` (`handleAddProductDialogItemToCart`): valida → arma el ticket → `addToCartThunk` → snackbar.

## 📦 Firma

```ts
usePresentationSearch(): UsePresentationSearchReturn
```

- `query` / `onQueryChange` — texto del input.
- `results` — hasta 8 `PresentationRow`, ya filtradas y ordenadas.
- `isOpen` — `true` cuando `query` no está vacía.
- `highlightedIndex` / `onHighlight` — fila resaltada por teclado o mouse.
- `onKeyDown` — maneja `↑`/`↓` (navegar), `Enter` (agregar la resaltada), `Esc` (limpiar).
- `onSelect(row)` — agrega esa presentación directo (click en la fila o en el botón `+`).
- `onClear()` — limpia la query.

Al agregar, se limpia la query y se cierra el dropdown, para poder encadenar altas sin tocar el mouse.

## 💡 Ejemplo

```tsx
const search = usePresentationSearch();
<PresentationSearchBar search={search} />
```

## ✨ Notas

- Usa `useDeferredValue` sobre la query para no bloquear el input con catálogos grandes (150–1000 SKUs).
- Si la presentación ya está en el carrito, `addToCartThunk`/`addToCartAction` suman la cantidad en vez de duplicar la fila — este hook no necesita lógica extra para eso.
- La cantidad agregada es `1` para venta por unidad y `100` (gramos) para venta por peso.
