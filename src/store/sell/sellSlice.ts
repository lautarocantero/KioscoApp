
// # Slice: sellSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **ventas** en la aplicación.  
// Actualmente funciona como **stub** (estructura inicial) sin reducers definidos, preparado para futuras implementaciones.  

// ## Estado inicial 🔧  
// - `_id`: identificador único de la venta (null por defecto).  
// - `name`: nombre de la venta (string vacío).  
// - `description`: descripción de la venta (string vacío).  
// - `created_at`: fecha de creación (string vacío).  
// - `updated_at`: fecha de última actualización (string vacío).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - Actualmente no hay reducers implementados.  
// - En futuras iteraciones se pueden añadir acciones como:  
//   - Crear nueva venta.  
//   - Editar venta existente.  
//   - Eliminar venta.  
//   - Manejar errores específicos.  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `sellSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de ventas en un único slice.  
// - Escalabilidad: preparado para añadir reducers y acciones según crezca la funcionalidad de ventas.  


import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellState } from '../../typings/sells/sellsTypes';


const initialState: SellState = {
    _id: null,
    name: '',
    description: '',
    created_at: '',
    updated_at: '',
    errorMessage: null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {

    }
});

// export const {} = sellSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;