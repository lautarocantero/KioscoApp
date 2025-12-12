
// # Slice: productVariantSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **variantes de productos**.  
// Define el estado inicial, reducers y acciones para cargar variantes, manejar errores y controlar el ciclo de verificación.  

// ## Estado inicial 🔧  
// - `productVariants`: lista de variantes de producto (array vacío).  
// - `isLoading`: indica si se está cargando información (false por defecto).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - **setProductsVariants**:  
//   - Actualiza `productVariants` con el payload recibido.  
//   - Cambia `isLoading` a `false`.  
//   - Limpia `errorMessage`.  
// - **setError**:  
//   - Recibe un objeto con `errorMessage` y lo guarda en el estado.  
// - **checkingProductVariants**:  
//   - Limpia `productVariants` (array vacío).  
//   - Cambia `isLoading` a `false`.  
//   - Limpia `errorMessage`.  

// ## Acciones exportadas 🚀  
// - `setProductsVariants`  
// - `setError`  
// - `checkingProductVariants`  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `productVariantSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de variantes de producto en un único slice.  
// - Escalabilidad: se pueden añadir reducers para manejar casos como actualización de stock, precios o filtros.  
// - Consistencia: asegura que siempre se manejen los estados de carga y error de forma uniforme.  


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { ProductVariant, ProductVariantState, ProductVariantStateError } from "../../typings/productVariant/productVariant";


const initialState: ProductVariantState = {
    productVariants: [],
    isLoading: false,
    errorMessage: null,
}

export const productVariantSlice = createSlice({
    name: 'productVariants',
    initialState,
    reducers: {
        setProductsVariants: (state: ProductVariantState, action: PayloadAction<ProductVariant[]>) => {
            state.productVariants = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: ProductVariantState, action: PayloadAction<ProductVariantStateError> ) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        checkingProductVariants: (state: ProductVariantState) => {
            state.productVariants = [];
            state.isLoading = false;
            state.errorMessage = null;
        }
    }
});

export const { setProductsVariants, setError, checkingProductVariants } = productVariantSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productVariantSlice.reducer;