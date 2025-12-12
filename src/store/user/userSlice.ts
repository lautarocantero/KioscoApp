
// # Slice: userSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **usuarios** en la aplicación.  
// Define un estado inicial con datos básicos del usuario y posibles errores, aunque actualmente no implementa reducers.  

// ## Estado inicial 🔧  
// - `_id`: identificador único del usuario (null por defecto).  
// - `name`: nombre del usuario (string vacío).  
// - `description`: descripción o información adicional (string vacío).  
// - `createdAt`: fecha de creación (string vacío).  
// - `updatedAt`: fecha de última actualización (string vacío).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - Actualmente no hay reducers definidos.  
// - Se pueden añadir en el futuro para manejar acciones como:  
//   - Crear usuario.  
//   - Editar usuario.  
//   - Eliminar usuario.  
//   - Manejar errores específicos.  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `userSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de usuarios en un único slice.  
// - Escalabilidad: preparado para añadir reducers y acciones según crezca la funcionalidad de usuarios.  


import { createSlice } from "@reduxjs/toolkit";
import type { store } from "../store";

const initialState: UserState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

// export const {} = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default userSlice.reducer;