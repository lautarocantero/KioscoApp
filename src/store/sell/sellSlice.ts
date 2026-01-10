
//─────────────────── Slice 🍕: sellSlice ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Slice de Redux encargado de manejar el estado de las ventas (`sells`) y su interacción con datos asociados.  
// Define estado inicial, reducers y acciones principales para controlar la carga, actualización y manejo de errores en el historial de ventas.  

//──────────────────── Estado inicial 🛌 ─────────────────────//
// - `sells`: arreglo vacío inicialmente, contendrá la lista de ventas (`SellType[]`).  
// - `isLoading`: booleano que indica si las ventas se están cargando desde la API.  
// - `errorMessage`: mensaje de error en caso de fallos en la carga o actualización de ventas.  

//──────────────────── Reducers 🧰 ─────────────────────//
// - `setSells`: actualiza el estado con la lista de ventas recibida, desactiva el loading y limpia errores. 
// - `setSellSelected`: establece una venta específica como seleccionada en el estado. 
// - `setError`: establece un mensaje de error en el estado cuando ocurre un fallo.  
// - `checkingSells`: reinicia el estado de ventas, activa el loading y limpia errores previos.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Exportado como `.reducer` para integrarse en el store global de Redux.  
// - Modularidad: centraliza la lógica de estado de ventas en un único slice.  
// - Escalabilidad: admite futuros reducers para nuevas operaciones relacionadas con ventas (update, delete, filtros).  
// - Tipado fuerte con `SellStateInterface`, `SellType`, y `SellStateErrorType` para mayor robustez en TypeScript.  
//-----------------------------------------------------------------------------


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellType, SellStateInterface, SellStateErrorType } from '../../typings/sells/types/sellsTypes';


const initialState: SellStateInterface = {
    sells: [],
    sellSelected: null,
    isLoading: false,
    errorMessage: null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {
        setSells: (state: SellStateInterface, action: PayloadAction<SellType[]>) => {
            state.sells = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setSellSelected: (state: SellStateInterface, action: PayloadAction<SellType>) => {
            state.sellSelected = action.payload;
        },
        setError: (state: SellStateInterface, action: PayloadAction<SellStateErrorType>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.errorMessage = errorMessage;
        },
        checkingSells: (state: SellStateInterface) => {
            state.sells = [];
            state.isLoading = true;
            state.errorMessage = null;
        }
    }
});

export const {setSells,setSellSelected, setError,checkingSells} = sellSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;