
// # Slice: PresentationSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **variantes de productos**.  
// Define el estado inicial, reducers y acciones para cargar variantes, manejar errores y controlar el ciclo de verificación.  

// ## Estado inicial 🔧  
// - `Presentations`: lista de variantes de producto (array vacío).  
// - `isLoading`: indica si se está cargando información (false por defecto).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  

// - **setProductsVariants**:  
//   - Actualiza `Presentations` con el payload recibido.  
//   - Cambia `isLoading` a `false`.  
//   - Limpia `errorMessage`.

// - **startLoadingPresentations**:
//   - Actualiza `Presentations` a un array vacio.
//   - Cambia `isLoading` a `true`.  
//   - Limpia `errorMessage`.

// - **setError**:  
//   - Recibe un objeto con `errorMessage` y lo guarda en el estado.  

// - **checkingPresentations**:  
//   - Limpia `Presentations` (array vacío).  
//   - Cambia `isLoading` a `false`.  
//   - Limpia `errorMessage`.  

// ## Acciones exportadas 🚀  
// - `setProductsVariants`  
// - `startLoadingPresentations`
// - `setError`  
// - `checkingPresentations`  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `PresentationSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de variantes de producto en un único slice.  
// - Escalabilidad: se pueden añadir reducers para manejar casos como actualización de stock, precios o filtros.  
// - Consistencia: asegura que siempre se manejen los estados de carga y error de forma uniforme.  


import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Presentation, PresentationState, PresentationStateError } from "../../typings/presentation/presentationTypes";


const initialState: PresentationState = {
    Presentations: [],
    isLoading: false,
    errorMessage: null,
}

export const presentationSlice = createSlice({
    name: 'Presentations',
    initialState,
    reducers: {
        setProductsVariants: (state: PresentationState, action: PayloadAction<Presentation[]>) => {
            state.Presentations = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        startLoadingPresentations: (state: PresentationState) => {
            state.Presentations = [];
            state.isLoading = true;
            state.errorMessage = null;
        },
        checkingPresentations: (state: PresentationState) => {
            state.Presentations = [];
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: PresentationState, action: PayloadAction<PresentationStateError> ) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.errorMessage = errorMessage;
        },
    }
});

export const { setProductsVariants, startLoadingPresentations, checkingPresentations, setError } = presentationSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default presentationSlice.reducer;