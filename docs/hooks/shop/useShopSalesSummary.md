# 🪝 `useShopSalesSummary`

> Hook de React que arma el gráfico de ventas y el ranking de vendedores destacados de `/shop`, 100% a partir de ventas reales.

## 🎯 ¿Para qué sirve?

No existe ningún endpoint de "reportes agregados de toda la tienda" en el backend (solo hay analíticas por presentación puntual, ver `fetchPresentationAnalytics`). Este hook resuelve el gráfico de "Ventas — últimos 7 días" y el panel "Vendedores destacados" trayendo el listado completo de ventas (`useSellsListData`, que ya estaba resuelto para `/sells`) y agregándolo client-side con `aggregateSellsByDay`/`aggregateTopSellers`.

## 📦 Firma

```ts
useShopSalesSummary(): {
  dailySales: DailySalesPoint[];
  weekTotal: number;
  topSellers: TopSellerSummary[];
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
const { dailySales, weekTotal, topSellers, isLoading, error } = useShopSalesSummary();

<ShopSalesChart dailySales={dailySales} weekTotal={weekTotal} isLoading={isLoading} error={error} />
<ShopTopSellers topSellers={topSellers} isLoading={isLoading} error={error} />
```

## ✨ Beneficios

- 🔁 **Reusa `useSellsListData` y `useSellersListData`**, ya resueltos para `/sells` y `/sellers` — no dispara fetches nuevos ni duplica lógica de store.
- 🧮 **Toda la agregación vive en helpers puros y testeados** (`aggregateSellsByDay`, `aggregateTopSellers`), no en el hook ni en el `.tsx`.

## 🚧 Pendiente / limitación conocida

`getSellsThunk()` trae **todas** las ventas históricas (no hay filtro de fechas en el backend). Es dato real, pero si el volumen de ventas crece mucho esto puede volverse pesado — en ese momento habría que agregar un endpoint de backend con rango de fechas en vez de agregar client-side.
