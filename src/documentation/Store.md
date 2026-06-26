// # 📦 Store Global - Redux Toolkit
// Este archivo centraliza la configuración del store y documenta cada slice.

// ## Importaciones principales
import { configureStore } from "@reduxjs/toolkit";

// Reducers de cada slice
import authReducer from "./auth/authSlice";
import productReducer from "./product/productSlice";
import PresentationReducer from "./Presentation/PresentationSlice";
import sellerReducer from "./seller/sellerSlice";
import sellReducer from "./sell/sellSlice";
import providerReducer from "./provider/providerSlice";

// ## Configuración del store
export const store = configureStore({
  reducer: {
    auth: authReducer,              // Maneja autenticación (login, logout, registro, errores)
    product: productReducer,        // Maneja lista de productos, estado de carga y errores
    Presentations: PresentationReducer, // Maneja variantes de productos
    seller: sellerReducer,          // Maneja carrito, producto seleccionado y errores
    sell: sellReducer,              // Maneja estado de ventas (estructura inicial)
    provider: providerReducer,      // Maneja estado de proveedores (estructura inicial)
  },
});

// ## Tipos derivados para TypeScript
export type RootState = ReturnType<typeof store.getState>; // Representa todo el estado global
export type AppDispatch = typeof store.dispatch;           // Tipo del dispatch para thunks y componentes

// ## 📑 Documentación de cada slice

// ### authSlice
// - Estado: credenciales, usuario autenticado, errores.
// - Acciones: checkingCredentials, login, logout, clearAuthError.
// - Thunks: startLoginWithEmailPassword, startRegister, startLogout, startCheckAuth.

// ### productSlice
// - Estado: lista de productos, isLoading, errorMessage.
// - Acciones: setProducts, setError, checkingProducts.
// - Thunks: getProducts.

// ### PresentationSlice
// - Estado: variantes de productos, isLoading, errorMessage.
// - Acciones: setProductsVariants, setError, checkingPresentations.
// - Thunks: getPresentationsById.

// ### sellerSlice
// - Estado: carrito, producto seleccionado, errorMessage.
// - Acciones: setProductSelected, addToCartAction, setError.
// - Thunks: selectProductThunk, addToCartThunk.

// ### sellSlice
// - Estado: ventas (estructura inicial).
// - Reducers: aún no implementados.
// - Preparado para futuras acciones de creación, edición y eliminación de ventas.

// ### providerSlice
// - Estado: proveedores (estructura inicial).
// - Reducers: aún no implementados.
// - Preparado para futuras acciones de gestión de proveedores.

// ## 🔑 Puntos clave
// - El store centraliza todo el estado global.
// - Cada slice maneja su propia lógica y estado.
// - Los thunks siguen el patrón: checking → éxito → error.
// - Tipado fuerte con RootState y AppDispatch asegura seguridad en TypeScript.
// - Escalable: se pueden añadir más slices sin romper la estructura.
