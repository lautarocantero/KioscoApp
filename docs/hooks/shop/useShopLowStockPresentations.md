# 🪝 `useShopLowStockPresentations`

> Hook de React que arma la lista de "Productos con stock bajo" de `/shop`, con stock actual y mínimo reales por presentación.

## 🎯 ¿Para qué sirve?

Ningún endpoint bulk de productos (`get-products-with-stock`, `get-products-with-presentations`) trae `min_stock` — solo `stock`. El único que trae ambos para **todas** las presentaciones de la tienda es `GET /get-product-presentations` (`getPresentationsRequest`, en `presentationsApi.ts`), que existía en el backend pero no tenía ningún thunk/reducer que lo consumiera.

Este hook:
1. Dispara `fetchAllPresentationsThunk()` (nuevo, guarda en `state.presentation.allPresentations` — un campo separado de `presentations`, que es por-producto, para no pisarse con `fetchPresentationsByProductId`).
2. Filtra/clasifica con `getLowStockPresentations` (helper puro): `stock < min_stock` → Bajo; `stock <= 0` → Crítico (incluye stock negativo, ej. una venta que dejó el stock en rojo).
3. Devuelve los 20 más críticos (menor ratio `stock/min_stock` primero) + el `total` real, para que la UI pueda aclarar "mostrando 20 de N" en vez de un scroll interminable.

## 📦 Firma

```ts
useShopLowStockPresentations(): {
  lowStock: LowStockPresentationSummary[]; // máximo 20, más críticos primero
  total: number;                           // cantidad real total por debajo del mínimo
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
const { lowStock, total, isLoading, error } = useShopLowStockPresentations();
<ShopLowStockList lowStock={lowStock} total={total} isLoading={isLoading} error={error} />
```

## ✨ Beneficios

- 🔌 **Conecta un endpoint real que ya existía** en vez de inventar el dato o dejarlo como solo un *count*.
- 🧮 **Filtro/clasificación en un helper puro y testeado** (`getLowStockPresentations`), no en el hook ni en el `.tsx`.
- 📦 **Cachea igual que `useProductStats`/`useProvidersLinkData`**: si ya hay presentaciones en el store, no vuelve a pedirlas.

## 🚧 Nota sobre el volumen de datos

En un catálogo real puede haber cientos de presentaciones por debajo de su mínimo (dato correcto, no es un bug) — por eso se recorta a los 20 más críticos en vez de listar todo. Ver [docs/features/shopDashboard.md](../../features/shopDashboard.md).
