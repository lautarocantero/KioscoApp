# 🪝 `useShopSalesSummary`

> Hook de React que arma el gráfico de ventas (con rango elegible) y el ranking de vendedores destacados de `/shop`, 100% a partir de ventas reales.

## 🎯 ¿Para qué sirve?

No existe ningún endpoint de "reportes agregados de toda la tienda" en el backend (solo hay analíticas por presentación puntual, ver `fetchPresentationAnalytics`). Este hook resuelve el gráfico de "Ventas" y el panel "Vendedores destacados" trayendo el listado completo de ventas (`useSellsListData`, que ya estaba resuelto para `/sells`) y agregándolo client-side con `aggregateSellsByDay`/`aggregateTopSellers`.

El rango del gráfico (`range`) es estado local del hook — cambiar de "Últimos 7 días" a "Último mes" no dispara un fetch nuevo, solo recalcula `dailySales`/`periodTotal` sobre el mismo listado de ventas ya traído (`SHOP_SALES_RANGE_DAYS` en `typings/shop/shopLabels.ts` mapea cada `ShopSalesRange` a su cantidad de días).

`topSellers` (ventas del mes) es independiente del selector de rango del gráfico — siempre es el mes calendario en curso.

## 📦 Firma

```ts
useShopSalesSummary(): {
  dailySales: DailySalesPoint[];
  periodTotal: number;
  range: ShopSalesRange;
  setRange: (range: ShopSalesRange) => void;
  topSellers: TopSellerSummary[];
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
const { dailySales, periodTotal, range, setRange, topSellers, isLoading, error } = useShopSalesSummary();

<ShopSalesChart dailySales={dailySales} periodTotal={periodTotal} range={range} setRange={setRange} isLoading={isLoading} error={error} />
<ShopTopSellers topSellers={topSellers} isLoading={isLoading} error={error} />
```

## ✨ Beneficios

- 🔁 **Reusa `useSellsListData` y `useSellersListData`**, ya resueltos para `/sells` y `/sellers` — no dispara fetches nuevos ni duplica lógica de store.
- 🧮 **Toda la agregación vive en helpers puros y testeados** (`aggregateSellsByDay`, `aggregateTopSellers`), no en el hook ni en el `.tsx`.
- ⚡ **Cambiar de rango es instantáneo** (sin loading): es la misma data ya en memoria, solo cambia cómo se agrupa.

## 🚧 Pendiente / limitación conocida

`getSellsThunk()` trae **todas** las ventas históricas (no hay filtro de fechas en el backend). Es dato real, pero si el volumen de ventas crece mucho esto puede volverse pesado — en ese momento habría que agregar un endpoint de backend con rango de fechas en vez de agregar client-side.
