
// # Slice: providerSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **proveedores** en la aplicación.  
// Actualmente funciona como **stub** (estructura inicial) sin reducers definidos, preparado para futuras implementaciones.  

// ## Estado inicial 🔧  
// - `_id`: identificador único del proveedor (null por defecto).  
// - `name`: nombre del proveedor (string vacío).  
// - `description`: descripción del proveedor (string vacío).  
// - `createdAt`: fecha de creación (string vacío).  
// - `updatedAt`: fecha de última actualización (string vacío).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - Actualmente no hay reducers implementados.  
// - En futuras iteraciones se pueden añadir acciones como:  
//   - Crear proveedor.  
//   - Editar proveedor.  
//   - Eliminar proveedor.  
//   - Manejar errores específicos.  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `providerSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de proveedores en un único slice.  
// - Escalabilidad: preparado para añadir reducers y acciones según crezca la funcionalidad de proveedores.  


import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';


const initialState: ProviderState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {

    }
});

export const {} = providerSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default providerSlice.reducer;