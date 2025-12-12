
// # Slice: productSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **productos** en la aplicación.  
// Define el estado inicial, reducers y acciones para cargar productos, manejar errores y controlar el ciclo de verificación.  

// ## Estado inicial 🔧  
// - `products`: lista de productos (array vacío).  
// - `isLoading`: indica si se está cargando información (false por defecto).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - **setProducts**:  
//   - Actualiza `products` con el payload recibido.  
//   - Cambia `isLoading` a `false`.  
//   - Limpia `errorMessage`.  
// - **setError**:  
//   - Recibe un objeto con `errorMessage` y lo guarda en el estado.  
// - **checkingProducts**:  
//   - Limpia `products` (array vacío).  
//   - Cambia `isLoading` a `true` para indicar que se está cargando.  
//   - Limpia `errorMessage`.  

// ## Acciones exportadas 🚀  
// - `setProducts`  
// - `setError`  
// - `checkingProducts`  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `productSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de productos en un único slice.  
// - Escalabilidad: se pueden añadir reducers para manejar casos como actualización de stock, filtrado por categorías o búsqueda.  
// - Consistencia: asegura que siempre se manejen los estados de carga y error de forma uniforme.  


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Product, ProductState, ProductStateError } from "../../typings/product/productTypes";

const initialState: ProductState = {
    products: [],
    isLoading: false,
    errorMessage: null,
}

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        setProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: ProductState, action: PayloadAction<ProductStateError>) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        checkingProducts: (state: ProductState) => {
            state.products = [];
            state.isLoading = true;
            state.errorMessage = null;
        }
    }
});

export const { setProducts , setError, checkingProducts } = productSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;