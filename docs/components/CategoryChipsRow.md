# CategoryChipsRow — Documentación

## ¿Para qué sirve?

Fila de chips de categoría del catálogo de `/new-sell` (reemplaza el dropdown `SellbarFilter` que antes vivía en el header). `overflow-x: auto` (nunca `hidden`) para que las últimas categorías no queden inaccesibles en pantallas angostas.

No recibe props — llama a `useSellbarCategories` directamente. Esto es seguro porque la selección vive en Redux (`state.cart.selectedCategory`), no en un `useState` local: se puede montar este componente en cualquier lugar del árbol sin desincronizar el filtro.

## Comportamiento

- Si no hay categorías disponibles (`list.length === 0`), no renderiza nada.
- Chip "Todas" limpia el filtro (`onSelect(null)`).
- El chip activo se pinta sólido con `theme.palette.primary.main`.

## Ejemplo de uso

```tsx
<CategoryChipsRow />
```

## Ver también

- [useSellbarCategories](../hooks/cart/useSellbarCategories.md)
