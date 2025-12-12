
// # Slice: authSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de autenticación del usuario.  
// Define el estado inicial, reducers y acciones relacionadas con login, logout, verificación de credenciales y limpieza de errores.  

// ## Estado inicial 🔧  
// - `_id`: identificador del usuario (null por defecto).  
// - `username`: nombre de usuario (string vacío).  
// - `email`: correo electrónico (string vacío).  
// - `status`: estado de autenticación (`AuthStatus.Checking` por defecto).  
// - `profilePhoto`: foto de perfil (null).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - **login**:  
//   - Actualiza `_id`, `username`, `email`, `profilePhoto`.  
//   - Cambia `status` a `AuthStatus.Authenticated`.  
//   - Limpia `errorMessage`.  
// - **logout**:  
//   - Resetea `_id`, `username`, `email`, `profilePhoto`.  
//   - Cambia `status` a `AuthStatus.NotAuthenticated`.  
//   - Guarda `errorMessage` si existe en el payload.  
// - **checkingCredentials**:  
//   - Cambia `status` a `AuthStatus.Checking`.  
// - **clearAuthError**:  
//   - Limpia `errorMessage`.  

// ## Acciones exportadas 🚀  
// - `login`  
// - `logout`  
// - `checkingCredentials`  
// - `clearAuthError`  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `authSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza toda la lógica de autenticación en un único slice.  
// - Escalabilidad: se pueden añadir más reducers para manejar casos como refresh de token o actualización de perfil.  


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import { AuthStatus } from '../../typings/auth/enums';
import type { AuthLoginSlicePayload, AuthSliceErrorPayload, AuthSliceState } from '../../typings/auth/authTypes';


const initialState: AuthSliceState = {
    _id: null,  
    username: '',  
    email: '',
    status: AuthStatus.Checking,
    profilePhoto: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthSliceState, action: PayloadAction<AuthLoginSlicePayload>) => {
            const { payload } = action;
            const {_id , username, email,  profilePhoto } = payload;
            state._id = _id;
            state.username = username ?? '';
            state.email = email ?? '';
            state.status = AuthStatus.Authenticated;
            state.profilePhoto = profilePhoto ?? null;
            state.errorMessage = null
        },
        logout: (state: AuthSliceState, action: PayloadAction<AuthSliceErrorPayload>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.status = AuthStatus.NotAuthenticated;
            state.email = '';
            state.username = '';
            state.profilePhoto = null;
            state._id = null;
            state.errorMessage = errorMessage ?? null;
        },
        checkingCredentials: (state: AuthSliceState ) => {
            state.status = AuthStatus.Checking;
        },
        clearAuthError: (state: AuthSliceState) => {
            state.errorMessage = null;
        }
    }
});

//recordar que el default son los reducers
export const { login, logout, checkingCredentials,clearAuthError } = authSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default authSlice.reducer;