# 🧩 `ShopMascotPanel`

> Panel de la mascota Stocko en `/shop`: muestra los números reales del día y da acceso directo a "Nueva venta", "Ingresar stock" y (solo admin) "Ver estadísticas".

## 📦 Props

Ver `ShopMascotPanelProps` en `src/typings/shop/shopComponentTypes.ts`: `kioscoName`, `isAdmin`, `kpis`, `hasSellsToday`, `criticalStockCount`, `partialsAlert`, `onNewSale`, `onEnterStock`, `onViewStatistics`.

El headline/bajada se arman con `t()` interpolando estos valores ya resueltos (i18n `shop.mascot.*`) — no hay ninguna oración armada a mano en el componente, así queda traducible. Sin saludo con nombre: el headline es solo el resumen de ventas (o el texto fijo `shop.mascot.headlineEmpty` si todavía no hay ventas hoy).

## 💡 Ejemplo

```tsx
// modules/shop/pages/Shop/ShopPage.tsx
<ShopMascotPanel
  kioscoName={kioscoName}
  isAdmin={isAdmin}
  kpis={dailySummary.kpis}
  hasSellsToday={dailySummary.hasSellsToday}
  criticalStockCount={lowStockPresentations.criticalCount}
  partialsAlert={dailySummary.partialsAlert}
  onNewSale={() => navigate("/new-sell")}
  onEnterStock={() => navigate("/products")}
  onViewStatistics={() => navigate("/shop/stadistics")}
/>
```

## ✨ Notas

- Imagen condicionada a `hasSellsToday`: `Stocko-mascotCircle-happy.png` si ya hay ventas hoy, `Stocko-mascotCircle-sad.png` si todavía no hay ninguna. Ambos assets ya estaban en el repo (`public/images/logo/`) — no se agregó ningún asset nuevo.
- "Ver estadísticas" no se muestra a vendedores (`isAdmin`), mismo criterio que el resto de `/shop` (`useIsActiveKioscoAdmin`).

## Tests

- `src/modules/shop/test/components/ShopMascotPanel.test.tsx`
