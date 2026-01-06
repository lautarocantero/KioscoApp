
//─────────────────── Slice 🍕: sellSlice ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Slice de Redux encargado de manejar el estado de las ventas (`sells`) y su interacción con datos asociados.  
// Define estado inicial, reducers y acciones principales para controlar la carga, actualización y manejo de errores en el historial de ventas.  

//──────────────────── Estado inicial 🛌 ─────────────────────//
// - `sells`: arreglo vacío inicialmente, contendrá la lista de ventas (`Sell[]`).  
// - `isLoading`: booleano que indica si las ventas se están cargando desde la API.  
// - `errorMessage`: mensaje de error en caso de fallos en la carga o actualización de ventas.  

//──────────────────── Reducers 🧰 ─────────────────────//
// - `setSells`: actualiza el estado con la lista de ventas recibida, desactiva el loading y limpia errores.  
// - `setError`: establece un mensaje de error en el estado cuando ocurre un fallo.  
// - `checkingSells`: reinicia el estado de ventas, activa el loading y limpia errores previos.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Exportado como `.reducer` para integrarse en el store global de Redux.  
// - Modularidad: centraliza la lógica de estado de ventas en un único slice.  
// - Escalabilidad: admite futuros reducers para nuevas operaciones relacionadas con ventas (update, delete, filtros).  
// - Tipado fuerte con `SellState`, `Sell`, y `SellStateError` para mayor robustez en TypeScript.  
//-----------------------------------------------------------------------------


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { Sell, SellState, SellStateError } from '../../typings/sells/sellsTypes';


const initialState: SellState = {
    sells: [],
    isLoading: false,
    errorMessage: null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {
        setSells: (state: SellState, action: PayloadAction<Sell[]>) => {
            state.sells = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: SellState, action: PayloadAction<SellStateError>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.errorMessage = errorMessage;
        },
        checkingSells: (state: SellState) => {
            state.sells = [];
            state.isLoading = true;
            state.errorMessage = null;
        }
    }
});

export const {setSells,setError,checkingSells} = sellSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;