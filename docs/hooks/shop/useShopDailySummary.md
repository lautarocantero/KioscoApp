# 🪝 `useShopDailySummary`

> Hook de React que arma el resumen del día de `/shop`: KPIs de hoy vs ayer, fiados sin cobrar, hora pico, ventas por hora, más vendidos y vendedores activos.

## 🎯 ¿Para qué sirve?

Reusa las ventas ya traídas por `useSellsListData` (misma fuente que `useSellsContextBand` en `/sells`) y las mismas piezas puras de esa banda — `buildSellsPeriodRange`, `aggregateSellsPeriodKpis`, `aggregateSellsPeakHour`, `aggregateSellsPartialsAlert` — fijadas en `SellsPeriodEnum.Today`. A diferencia de `useSellsContextBand`, acá el período no es elegible por el usuario (siempre es "hoy"), así que no expone selector ni disponibilidad por plan.

Suma tres agregaciones propias de `/shop` sobre las mismas ventas de hoy ya filtradas:
- `aggregateSellsByHour` → gráfico de ventas por hora.
- `aggregateTopProductsToday` → ranking "Más vendidos hoy".
- `aggregateActiveSellersToday` → "En el mostrador ahora" (vendedores online + su venta de hoy).

No dispara ningún fetch propio — todo sale de `useSellsListData`/`useSellersListData`, ya usadas en el resto de la app.

## 📦 Firma

```ts
useShopDailySummary(): {
  kpis: SellsPeriodKpis;
  partialsAlert: SellsPartialsAlertSummary;
  peakHour: SellsPeakHourFact;
  hourly: HourlySalesPoint[];
  topProducts: TopProductSummary[];
  activeSellers: ActiveSellerSummary[];
  hasSellsToday: boolean;
  isLoading: boolean;
  error: string | null;
}
```

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
const dailySummary = useShopDailySummary();

<ShopDailyHeroCard kpis={dailySummary.kpis} partialsAlert={dailySummary.partialsAlert} ... />
```

## ✨ Beneficios

- 🔁 **Reusa las piezas puras de la banda de `/sells`** en vez de reimplementar el cálculo de "hoy vs ayer" — mismo criterio, mismo `SellsPeriodEnum.Today`.
- 📊 **Datos 100% reales**, sin ningún valor mockeado — ver [docs/features/shopDashboard.md](../../features/shopDashboard.md) para qué se omitió deliberadamente por no tener fuente real (meta del día, caja, vencimientos, horario de turno).
