# PresentationSearchBar — Documentación

## ¿Para qué sirve?

Input ancho del header de `/new-sell` con dropdown de autocompletado por presentación (no por producto). Reemplaza a `SellBarSearch`. Puramente presentacional — toda la lógica (índice, matching, navegación por teclado, alta al carrito) llega resuelta por `usePresentationSearch` vía la prop `search`.

## Props (`PresentationSearchBarProps`)

```ts
interface PresentationSearchBarProps {
  search: UsePresentationSearchReturn;
}
```

## Comportamiento

- El dropdown (`role="listbox"`) solo se muestra si `search.isOpen` (query no vacía).
- `↑`/`↓`/`Enter`/`Esc` se manejan en el `onKeyDown` del input (viene resuelto del hook).
- Mientras no hay query, muestra el hint de atajos (`/ Buscar · F2 Escanear · F9 Generar ticket`); con query, muestra el botón de limpiar.
- El input tiene `id={SELL_SEARCH_INPUT_ID}` — es el target del atajo `/` (`useSellShortcuts`).

## Ejemplo de uso

```tsx
const search = usePresentationSearch();
<PresentationSearchBar search={search} />
```

## Ver también

- [usePresentationSearch](../hooks/cart/usePresentationSearch.md)
- [PresentationSearchResultRow](./PresentationSearchResultRow.md)
