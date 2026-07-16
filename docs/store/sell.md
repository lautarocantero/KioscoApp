# 🗄️ `sell`

> Documentación del slice y thunks de ventas.

## 🎯 ¿Para qué sirve?

Gestiona el estado de ventas registradas, la venta seleccionada y las operaciones de obtener, crear y eliminar ventas.

## 📦 Archivos

- `src/store/sell/sellSlice.ts`
- `src/store/sell/sellsThunks.ts`

## 💡 Contenido

### `sellSlice.ts`
- Estado inicial:
  - `sells`
  - `sellSelected`
  - `isLoading`
  - `errorMessage`
- Reducers:
  - `setSells`
  - `setSellSelected`
  - `setError`
  - `checkingSells`

### `sellsThunks.ts`
- Thunks disponibles:
  - `getSellsThunk`
  - `getSellByIdThunk`
  - `createSellThunk`
  - `deleteSellThunk`
- Maneja requests de ventas y errores con `handleError`.

## ✨ Beneficios

- 🧾 **Centraliza la gestión del histórico de ventas**.
- 🔁 **Soporta CRUD básico de ventas**.
- ✅ **Mantiene consistencia de errores y carga**.
