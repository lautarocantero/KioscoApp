# 🧩 `ShopAttentionPanel`

> "Necesita tu atención" de `/shop`: stock crítico/bajo y fiados sin cobrar, con el botón real de "Reponer y pedir" (boleta de reposición en PDF).

Reemplaza al viejo `ShopInventoryPanel`/`ShopLowStockList` (removidos en el rediseño a "resumen del día"): en vez de la tabla itemizada de presentaciones bajo mínimo, muestra un resumen compacto de 2 filas — el detalle completo sigue disponible en `/products`. Ver [docs/features/shopDashboard.md](../features/shopDashboard.md).

Solo muestra las dos alertas con dato real disponible hoy (stock y fiados). "Vencimientos" y "pedidos por llegar" del mockup de referencia se omitieron a propósito por no tener una fuente real todavía — no se inventó el dato.

## 📦 Props

```ts
ShopAttentionPanelProps = {
  criticalStockCount: number;
  lowStockCount: number;
  partialsAlert: SellsPartialsAlertSummary;
  isLoading: boolean;
  error: string | null;
  isRestockDownloadDisabled: boolean;
  onRestockDownload: () => void;
}
```

## 💡 Ejemplo

```tsx
<ShopAttentionPanel
  criticalStockCount={lowStockPresentations.criticalCount}
  lowStockCount={lowStockPresentations.lowCount}
  partialsAlert={dailySummary.partialsAlert}
  isLoading={lowStockPresentations.isLoading || dailySummary.isLoading}
  error={lowStockPresentations.error ?? dailySummary.error}
  isRestockDownloadDisabled={restockReport.isDownloadDisabled}
  onRestockDownload={restockReport.handleDownload}
/>
```

## Tests

- `src/modules/shop/test/components/ShopAttentionPanel.test.tsx`
