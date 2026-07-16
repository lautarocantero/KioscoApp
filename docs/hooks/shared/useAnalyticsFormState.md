# 🪝 `useAnalyticsFormState`

> Hook de React para manejar el estado y las acciones del formulario de filtros de analytics.

## 🎯 ¿Para qué sirve?

Centraliza la lógica de fechas, vendedor y aplicación de filtros en un formulario de analytics. También controla si los filtros fueron activados por el usuario y permite limpiar todo al estado inicial.

## 📦 Firma

```ts
useAnalyticsFormState({ onApplyFilters }: UseAnalyticsParams)
```

- **`onApplyFilters`** — callback opcional que se ejecuta cuando se aplican o limpian los filtros.
- Devuelve el estado actual, los handlers y los flags de filtros activos.

## 💡 Ejemplo

```tsx
import { useAnalyticsFormState } from "../../hooks/shared/useAnalyticsFormState";

function AnalyticsFilters({ onApplyFilters }) {
  const {
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    sellerId,
    handleSellerChange,
    handleApplyFilters,
    handleClearFilters,
    areFiltersActive,
  } = useAnalyticsFormState({ onApplyFilters });

  return (
    <form>
      {/* inputs de fecha y select de vendedor */}
      <button type="button" onClick={handleApplyFilters}>Aplicar</button>
      <button type="button" onClick={handleClearFilters} disabled={!areFiltersActive}>
        Limpiar
      </button>
    </form>
  );
}
```

## ✨ Beneficios

- ✅ **Encapsula la lógica de filtros** en un solo hook.
- 🔄 **Manejo automático de valores por defecto** para fechas y vendedor.
- 🎯 **Permite detectar cuando hay filtros activos**.
- ♻️ **Facilita la reutilización** del estado de formulario en diferentes pantallas.
