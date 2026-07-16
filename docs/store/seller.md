# 🗄️ `seller`

> Documentación de los slices relacionados con vendedores y carrito.

## 🎯 ¿Para qué sirve?

Gestiona el estado del vendedor, el carrito de ventas y la lista de vendedores disponibles.

## 📦 Archivos

- `src/store/seller/sellerSlice.ts`
- `src/store/seller/sellerThunks.ts`
- `src/store/seller/sellerPersonSlice.ts`
- `src/store/seller/sellerPersonThunks.ts`

## 💡 Contenido

### `sellerSlice.ts`
- Estado inicial:
  - `_id`
  - `name`
  - `cart`
  - `productSelected`
  - `description`
  - `created_at`
  - `updated_at`
  - `errorMessage`
- Reducers:
  - `setProductSelected`
  - `addToCartAction`
  - `addUnitAction`
  - `removeFromCart`
  - `cleanCart`
  - `setError`

### `sellerPersonSlice.ts`
- Estado inicial:
  - `sellers`
  - `isLoading`
  - `errorMessage`
- Reducers:
  - `setSellers`
  - `checkingSellers`
  - `setSellersError`

### `sellerPersonThunks.ts`
- Thunks disponibles:
  - `getSellers`
- Dispara la carga de vendedores y actualiza el store.

## ✨ Beneficios

- 👥 **Mantiene el estado de vendedores y carrito separados**.
- 🧠 **Controla selección de producto y cantidad en carrito**.
- 🔎 **Provee lista de vendedores con estado de carga**.
