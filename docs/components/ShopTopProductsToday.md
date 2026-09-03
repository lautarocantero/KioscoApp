# 🧩 `ShopTopProductsToday`

> "Más vendidos hoy" de `/shop`: ranking de productos por monto vendido en el día, con cantidad y barra de progreso relativa al primero.

## 📦 Props

```ts
ShopTopProductsTodayProps = {
  topProducts: TopProductSummary[];
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
<ShopTopProductsToday
  topProducts={dailySummary.topProducts}
  isLoading={dailySummary.isLoading}
  error={dailySummary.error}
/>
```

Datos armados por [`aggregateTopProductsToday`](../helpers/aggregateTopProductsToday.md) dentro de `useShopDailySummary`.

## Tests

- `src/modules/shop/test/components/ShopTopProductsToday.test.tsx`
