# 🪝 `useSellers`

> Hook de React para obtener la lista de vendedores desde el store y mantener el estado de error.

## 🎯 ¿Para qué sirve?

Carga los vendedores disponibles y sincroniza el error interno con el estado del store, exponiendo los datos listos para la UI.

## 📦 Firma

```ts
useSellers(): {
  sellers: Seller[];
  loading: boolean;
  error: string | null;
  clearError: () => void;
}
```

- No recibe parámetros.
- Devuelve la lista de vendedores, el estado de carga, el error y un limpiador de errores.

## 💡 Ejemplo

```tsx
import { useSellers } from "../../hooks/sellers/useSellers";

function SellersSelect() {
  const { sellers, loading, error, clearError } = useSellers();

  if (loading) return <p>Cargando vendedores...</p>;
  if (error) return <p>{error}</p>;

  return (
    <select onFocus={clearError}>
      {sellers.map((seller) => (
        <option key={seller._id} value={seller._id}>{seller.name}</option>
      ))}
    </select>
  );
}
```

## ✨ Beneficios

- 🧠 **Centraliza la carga de vendedores**.
- 🔄 **Sincroniza errores del store con el hook**.
- ♻️ **Permite limpiar errores desde la UI**.
- ✅ **Facilita el reuso del estado de vendedores**.
