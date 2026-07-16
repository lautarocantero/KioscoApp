# 🪝 `useProducts`

> Hook de React para manejar la pantalla de productos y la eliminación de un producto.

## 🎯 ¿Para qué sirve?

Controla la lista de productos, búsqueda, estado de error y el flujo de borrado con diálogo.

## 📦 Firma

```ts
useProducts(): UseProductsReturn
```

- No recibe parámetros.
- Devuelve productos, estado de carga, error, diálogo de borrado, búsqueda y columnas de tabla.

## 💡 Ejemplo

```tsx
import { useProducts } from "../../hooks/products/useProducts";

function ProductsListPage() {
  const { productsWithPresentations, loading, columns, handleDeleteRequest } = useProducts();

  return (
    <ProductsTable data={productsWithPresentations} columns={columns} />
  );
}
```

## ✨ Beneficios

- 🧠 **Centraliza la lógica del listado** de productos.
- 🗂️ **Prepara columnas para la tabla**.
- 🧹 **Gestiona el diálogo de confirmación de borrado**.
- 🔎 **Incluye búsqueda con estado**.
