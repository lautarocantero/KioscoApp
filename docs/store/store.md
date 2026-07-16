# 🗄️ `store`

> Documentación de la configuración global de Redux y la organización de los slices de estado.

## 🎯 ¿Para qué sirve?

Define el store de la aplicación usando Redux Toolkit y agrupa los slices de estado para auth, usuario, productos, presentaciones, proveedores, ventas y vendedores.

## 📦 Contenido

- `src/store/store.ts` — configuración principal del store.
- Slices:
  - `auth/authSlice.ts`
  - `user/userSlice.ts`
  - `product/productSlice.ts`
  - `presentation/presentationSlice.ts`
  - `provider/providerSlice.ts`
  - `sell/sellSlice.ts`
  - `seller/sellerSlice.ts`
  - `seller/sellerPersonSlice.ts`
- Thunks y utilidades:
  - `auth/thunks.ts`
  - `product/productThunks.ts`
  - `presentation/presentationThunks.ts`
  - `sell/sellsThunks.ts`
  - `seller/sellerPersonThunks.ts`
  - `shared/handlerStoreError.ts`

## 💡 Ejemplo de uso

```ts
import { store } from "../../src/store/store";
import { Provider } from "react-redux";

function AppWrapper({ children }) {
  return <Provider store={store}>{children}</Provider>;
}
```

## ✨ Beneficios

- ✅ **Centraliza el estado global** de la aplicación.
- 🔧 **Usa Redux Toolkit** para slices y configuración simple.
- ♻️ **Modulariza el estado** en carpetas de dominio.
- 📌 **Tipado fuerte** con `RootState` y `AppDispatch`.
