# 🪝 `useProviderStats`

> Hook de React para obtener estadísticas de proveedores desde la API.

## 🎯 ¿Para qué sirve?

Carga estadísticas de proveedores y expone total, estado de carga y error.

## 📦 Firma

```ts
useProviderStats(): UseProviderStatsResult
```

- No recibe parámetros.
- Devuelve `totalProviders`, `loading` y `error`.

## 💡 Ejemplo

```tsx
import { useProviderStats } from "../../hooks/suppliers/useSupplier";

function ProviderStatsCard() {
  const { totalProviders, loading, error } = useProviderStats();

  if (loading) return <p>Cargando proveedores...</p>;
  if (error) return <p>{error}</p>;

  return <p>Total proveedores: {totalProviders}</p>;
}
```

## ✨ Beneficios

- 📊 **Centraliza la carga de estadísticas**.
- 🔄 **Maneja la lógica de error y carga**.
- ♻️ **Separa la data de proveedores de la UI**.
