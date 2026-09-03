# 🧩 `ShopDailyHeroCard`

> Tarjeta principal del resumen del día de `/shop`: total de ventas de hoy con variación vs ayer, tickets, ticket promedio, fiados sin cobrar y el gráfico de ventas por hora.

## 📦 Props

```ts
ShopDailyHeroCardProps = Pick<UseShopDailySummaryReturn,
  "kpis" | "partialsAlert" | "hourly" | "peakHour" | "hasSellsToday" | "isLoading" | "error">
```

Puramente presentacional: todo el cálculo (variación %, agregado por hora, hora pico) ya viene resuelto por [`useShopDailySummary`](../hooks/shop/useShopDailySummary.md).

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
const dailySummary = useShopDailySummary();

<ShopDailyHeroCard
  kpis={dailySummary.kpis}
  partialsAlert={dailySummary.partialsAlert}
  hourly={dailySummary.hourly}
  peakHour={dailySummary.peakHour}
  hasSellsToday={dailySummary.hasSellsToday}
  isLoading={dailySummary.isLoading}
  error={dailySummary.error}
/>
```

Sin ventas hoy (`hasSellsToday: false`) muestra `—` en vez de un `$0` que pueda confundirse con "cero ventas confirmado" vs "todavía no cargó".

## Tests

- `src/modules/shop/test/components/ShopDailyHeroCard.test.tsx`
