# 🪝 `useShopInventorySummary`

> Hook de React que arma el resumen de stock ("Inventario") de `/shop`: total, con stock, stock bajo y sin stock.

## 🎯 ¿Para qué sirve?

`ProductStats` (`GET /product/get-product-stats`) solo da `totalProducts` y `lowStockPresentations` — no separa "con stock" de "sin stock". Este hook combina esas stats (ya resueltas por `useProductStats`) con `getProductsWithStock()` (`GET /product/get-products-with-stock`, ya existía en `store/product/productThunks.ts` pero no tenía ningún hook que lo consumiera) para derivar el resto:

- `withStock` = cantidad de productos que trae `getProductsWithStock()` (al menos 1 presentación con stock > 0).
- `withoutStock` = `totalProducts - withStock` (nunca negativo).

No usa el listado de productos de `useProductListData`/`state.cart.products` a propósito: ese hook está acoplado al buscador/filtro de categoría del Catálogo (`state.cart.selectedCategory`/`searchTerm`), así que si el usuario dejó un filtro activo ahí, reusarlo daría un conteo de stock incorrecto en el dashboard. Este hook dispara su propio fetch, sin filtros, contra `state.product` (el módulo de productos, no el de carrito).

## 📦 Firma

```ts
useShopInventorySummary(): {
  total: number | null;
  withStock: number | null;
  lowStock: number | null;
  withoutStock: number | null;
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
const { total, withStock, lowStock, withoutStock, isLoading, error } = useShopInventorySummary();
<ShopInventoryPanel total={total} withStock={withStock} lowStock={lowStock} withoutStock={withoutStock} isLoading={isLoading} error={error} />
```

## 🚧 Pendiente / limitación conocida

No hay tabla de "productos con stock bajo" con stock actual + mínimo por producto: ningún endpoint wireado hoy devuelve `min_stock` junto al `stock` para todas las presentaciones en un solo request (el `Presentation` completo sí tiene `min_stock`, pero los endpoints en bulk como `get-products-with-stock` solo traen `stock`). Ver [docs/features/shopDashboard.md](../../features/shopDashboard.md).
