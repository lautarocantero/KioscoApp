# 🪝 `useProductsListData`

> Hook de React para manejar la lista de productos con búsqueda y debounce.

## 🎯 ¿Para qué sirve?

Centraliza el fetch de productos, la búsqueda con debounce y el estado de carga/error desde el store.

## 📦 Firma

```ts
useProductsListData(): UseProductsListDataResult
```

- No recibe parámetros.
- Devuelve productos, estado de carga, error, término de búsqueda y setter.

## 💡 Ejemplo

```tsx
import { useProductsListData } from "../../hooks/products/useProductListData";

function ProductsPage() {
  const { products, loading, searchTerm, setSearchTerm } = useProductsListData();

  return (
    <div>
      <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
      {loading ? <p>Cargando...</p> : <ProductList data={products} />}
    </div>
  );
}
```

## ✨ Beneficios

- 🔎 **Debounce automático de búsqueda**.
- 🗂️ **Manejo centralizado de lista y estado**.
- 📦 **Conecta el store con la UI** sin lógica adicional en la vista.
