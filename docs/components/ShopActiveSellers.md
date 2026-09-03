# 🧩 `ShopActiveSellers`

> "En el mostrador ahora" de `/shop`: vendedores online en este momento, con lo que vendieron hoy.

Reemplaza al viejo `ShopTopSellers` (ranking del mes) en el rediseño a "resumen del día": ya no es un top-N por ventas del mes, es la lista completa de quién está online ahora, ordenada por venta de hoy.

## 📦 Props

```ts
ShopActiveSellersProps = {
  activeSellers: ActiveSellerSummary[];
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
<ShopActiveSellers
  activeSellers={dailySummary.activeSellers}
  isLoading={dailySummary.isLoading}
  error={dailySummary.error}
/>
```

Datos armados por [`aggregateActiveSellersToday`](../helpers/aggregateActiveSellersToday.md) dentro de `useShopDailySummary`. Reusa `ShopInitialAvatar` y `SellerStatusIndicator`, ya usados en el resto de la app.

## Tests

- `src/modules/shop/test/components/ShopActiveSellers.test.tsx`
