# 🪝 `useProductData`

> Hook de React para obtener un producto desde el store y asegurar su carga si no está presente.

## 🎯 ¿Para qué sirve?

Lee el producto actual desde Redux y dispara la carga desde la API si el store no contiene la entidad solicitada.

## 📦 Firma

```ts
useProductData(productId: string | undefined): UseProductDataResult
```

- **`productId`** — id del producto que se quiere consultar.
- Devuelve el producto, el estado de carga y el error.

## 💡 Ejemplo

```tsx
import { useProductData } from "../../hooks/products/useProductData";

function ProductDetail({ productId }) {
  const { productData, isLoading, error } = useProductData(productId);

  if (isLoading) return <p>Cargando...</p>;
  if (error) return <p>{error}</p>;
  if (!productData) return <p>Producto no encontrado</p>;

  return <div>{productData.name}</div>;
}
```

## ✨ Beneficios

- 🧠 **Evita fetch redundante** cuando el store ya tiene el producto.
- 🔄 **Sincroniza la UI con Redux** de forma automática.
- ♻️ **Simplifica los componentes de detalle** al separar la lógica de carga.
