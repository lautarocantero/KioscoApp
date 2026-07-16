# 🪝 `usePresentationAnalytics`

> Hook de React para obtener y transformar los datos de analytics de una presentación.

## 🎯 ¿Para qué sirve?

Centraliza la carga de métricas de ventas por presentación, gestiona el estado de fecha, vendedor y recarga de datos, y expone el resultado formateado para la UI.

## 📦 Firma

```ts
usePresentationAnalytics(presentationId?: string, options?: UsePresentationAnalyticsOptions)
```

- **`presentationId`** — id opcional de la presentación que se quiere analizar.
- **`options`** — permite personalizar títulos, subtítulos y stock ya resuelto.
- Devuelve el estado de carga, error, filtros y los datos de analytics listos para mostrar.

## 💡 Ejemplo

```tsx
import { usePresentationAnalytics } from "../../hooks/presentations/usePresentationAnalytics";

function PresentationAnalytics({ presentationId }) {
  const { analyticsData, isLoading, error, applyFilters } =
    usePresentationAnalytics(presentationId);

  return (
    <section>
      {isLoading && <p>Cargando analíticas...</p>}
      {error && <p>{error}</p>}
      {analyticsData && <AnalyticsChart data={analyticsData} />}
      <button onClick={() => applyFilters({ sellerId: "all" })}>Refrescar</button>
    </section>
  );
}
```

## ✨ Beneficios

- 🔁 **Reuso de la lógica de fetching** de analytics.
- 🧠 **Manejo de estados y filtros** con una API limpia.
- 📊 **Devuelve datos ya mapeados** para componentes visuales.
- ✅ **Compatible con rutas y contexto de presentación**.
