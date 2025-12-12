
// # Thunks: Autenticación (authSlice)  

// ## Descripción 📦  
// Conjunto de thunks que manejan el ciclo completo de autenticación en la aplicación: login, registro, logout y verificación de sesión.  
// Se apoyan en las funciones de API (`authApi`) y en las acciones del slice `authSlice`.  

// ## Thunks 🎭  

// ### startLoginWithEmailPassword  
// - **Entrada**: `{ email, password }`.  
// - **Flujo**:  
//   1. Despacha `checkingCredentials()` para indicar inicio de login.  
//   2. Llama a `authLoginRequest`.  
//   3. Si no se recibe usuario válido:  
//      - Despacha `logout` con error.  
//      - Lanza un `Error`.  
//   4. Si se recibe usuario válido:  
//      - Despacha `login` con datos del usuario.  
//      - Retorna el usuario (`AuthPublic`).  
//   5. Manejo de errores con `handleErrorWithAction`.  

// ### startRegister  
// - **Entrada**: `{ sanitizedData }` con `username, email, password, repeatPassword, profilePhoto`.  
// - **Flujo**:  
//   1. Llama a `authRegisterRequest`.  
//   2. Si no se recibe `_id`:  
//      - Despacha `logout` con error.  
//      - Lanza un `Error`.  
//   3. Si se recibe `_id`:  
//      - Despacha `clearAuthError()`.  
//      - Retorna el `_id`.  
//   4. Manejo de errores con `handleErrorWithAction`.  

// ### startLogout  
// - **Flujo**:  
//   1. Llama a `authLogoutRequest`.  
//   2. Despacha `logout` limpiando el estado.  
//   3. Si ocurre error, se maneja con `handleError`.  

// ### startCheckAuth  
// - **Flujo**:  
//   1. Llama a `authCheckStatusRequest`.  
//   2. Si la respuesta es `200`:  
//      - Despacha `login` con los datos del usuario (`data`).  
//      - Retorna la respuesta (`AxiosResponse`).  
//   3. Si ocurre error, se maneja con `handleError`.  

// ## Acciones usadas 🚀  
// - `checkingCredentials`  
// - `login`  
// - `logout`  
// - `clearAuthError`  

// ## Tipos 📑  
// - `AuthActionsType`: unión de acciones de autenticación.  
// - `AuthPublic`: tipo de usuario público.  
// - `AuthRegisterSanitizedPayload`: payload para registro.  
// - `AuthCheckAuthDataResponse`: respuesta de verificación de sesión.  

// ## Notas técnicas 💽  
// - **Consistencia**: todos los flujos despachan acciones para mantener sincronizado el estado global.  
// - **Escalabilidad**: se pueden añadir thunks para refresh de token, recuperación de contraseña o actualización de perfil.  
// - **Centralización**: el manejo de errores se delega a `handleError` y `handleErrorWithAction` para evitar duplicación.  


import type { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { checkingCredentials, clearAuthError, login, logout, type AppDispatch, type RootState } from "./authSlice";
import { authCheckStatusRequest, authLoginRequest, authLogoutRequest, authRegisterRequest } from "../../modules/auth/api/authApi";
import type { AxiosResponse } from "axios";
import type { AuthCheckAuthDataResponse, AuthCheckAutResponse, AuthLoginRequestPayload, AuthPublic, AuthRegisterSanitizedPayload } from "../../typings/auth/authTypes";
import { handleErrorWithAction, handleError } from "../shared/handlerStoreError";

type AuthActionsType = 
  | ReturnType<typeof checkingCredentials> 
  | ReturnType<typeof login> 
  | ReturnType<typeof logout>
  ;

export const startLoginWithEmailPassword = (
  { email, password }: AuthLoginRequestPayload): ThunkAction<Promise<AuthPublic | undefined>, RootState, unknown, AuthActionsType> => {
  
    return async (dispatch: Dispatch) => {
      dispatch(checkingCredentials());
      try {
        const { user } : { user: AuthPublic} = await authLoginRequest({ email, password });

        if (!user) {
          dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
          throw new Error('No se recibió usuario válido');
        }

        dispatch(login({
          email: user.email,
          username: user.username,
          profilePhoto: user.profilePhoto,
          _id: user._id,
        }));

        return user as AuthPublic;
      } catch (error: unknown) {
        handleErrorWithAction({error, dispatch, action: logout}); 
      }
    };
};

export const startRegister = (
  { sanitizedData } : AuthRegisterSanitizedPayload): ThunkAction<Promise<string | undefined>, RootState, undefined, AnyAction> => {
    const {username, email, password, repeatPassword, profilePhoto } = sanitizedData;

    return async (dispatch: AppDispatch): Promise<string | undefined> => {
      try{
        const _id : string = await authRegisterRequest({username, email, password, repeatPassword, profilePhoto});

        if(!_id) {
          dispatch(logout({ errorMessage: 'No se pudo registrar al usuario, intente de nuevo' }));
          throw new Error('Error durante el  registro');
        }

        dispatch(clearAuthError());
        return _id as string;
      } catch (error: unknown) {
        handleErrorWithAction({error, dispatch, action: logout});  
      }
    }

}

export const startLogout = (): ThunkAction<void, RootState, unknown, AuthActionsType> => {
    return async(dispatch: Dispatch) => {
        try{
            await authLogoutRequest();
            dispatch(logout({errorMessage: null}))
        } catch(error: unknown) {
            handleError(error);
        }
    }
}

export const startCheckAuth = (): ThunkAction<Promise<AxiosResponse<AuthCheckAutResponse> | undefined>, RootState, unknown, AuthActionsType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authCheckStatusRequest();
      const { status, data } : { status: number, data: AuthCheckAuthDataResponse} = response;

      if(status !== 200) return;
      
      dispatch(login({
          email: data.email,
          username: data.username,
          profilePhoto: data.profilePhoto,
          _id: data._id,
        }));

      return response;
    } catch(error: unknown) {
        handleError(error);
    } 
  }
}