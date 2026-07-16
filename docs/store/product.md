# 🗄️ `product`

> Documentación del slice y thunks de productos.

## 🎯 ¿Para qué sirve?

Gestiona la lista de productos y el producto actual, incluyendo estados de carga y errores separados para lista y detalle.

## 📦 Archivos

- `src/store/product/productSlice.ts`
- `src/store/product/productThunks.ts`

## 💡 Contenido

### `productSlice.ts`
- Estado inicial:
  - `products`
  - `currentProduct`
  - `isLoading`
  - `errorMessage`
  - `isLoadingCurrent`
  - `currentProductError`
- Reducers:
  - `setProducts`
  - `setCurrentProduct`
  - `clearCurrentProduct`
  - `setError`
  - `checkingProducts`
  - `checkingCurrentProduct`
  - `setCurrentProductError`
  - `removeProduct`

### `productThunks.ts`
- Thunks disponibles:
  - `createProduct`
  - `getProducts`
  - `searchProducts`
  - `getProductById`
  - `editProduct`
  - `deleteProduct`
- Actualiza la lista o el producto actual.
- Maneja errores con `handleError`.

## ✨ Beneficios

- 📦 **Diferencia lista de productos y producto actual**.
- 🔄 **Permite refetch/actualización segura**.
- ✅ **Soporta navegación tras creación**.
