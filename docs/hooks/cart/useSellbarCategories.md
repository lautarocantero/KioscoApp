# 🪝 `useSellbarCategories`

> Hook del filtro de categoría de `/new-sell` (categorías disponibles + selección activa).

## 🎯 ¿Para qué sirve?

Trae las categorías disponibles (`getAvailableCategoriesRequest`) y maneja el estado del filtro: apertura/cierre del menú, label traducido, y la categoría seleccionada.

La categoría seleccionada **vive en Redux** (`state.cart.selectedCategory`, ya es la fuente que dispara el re-fetch de productos vía `fetchCartProducts`) — se lee con `useSelector` y se escribe con `setSelectedCategoryThunk`, en vez de un `useState` local espejado hacia Redux. Esto es lo que permite llamar el hook de forma segura desde más de un componente (por ejemplo, las chips de categoría del catálogo) sin desincronizar dos instancias del filtro.

## 📦 Firma

```ts
useSellbarCategories(params: { showSnackBar: (message: string, severity: AlertColor) => void }): UseCartBarCategoriesResult
```

- `list` / `isLoading` — categorías disponibles.
- `selected` / `selectedLabel` — categoría activa (Redux) y su label traducido.
- `getLabel(category)` — traduce un código de categoría a label.
- `anchorEl` / `isMenuOpen` / `onOpenMenu` / `onCloseMenu` — estado del menú (si el consumidor usa un `Menu` de MUI).
- `onSelect(category)` — despacha la selección a Redux.

## 💡 Ejemplo

```tsx
const categories = useSellbarCategories({ showSnackBar });
<CategoryChipsRow categories={categories} />
```

## ✨ Notas

- Si `getAvailableCategoriesRequest` falla, muestra `cart.snackbar.categoriesLoadFailed` vía `showSnackBar`.
- No dispara ningún fetch de productos — quien lee `state.cart.selectedCategory` (via `useSellerProductsListData`) es responsable de eso.
