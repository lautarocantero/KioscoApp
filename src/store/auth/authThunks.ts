import type { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { clearAuthError, login, logout, type AppDispatch, type RootState } from "./authSlice";
import { authCheckStatusRequest, authGoogleRequest, authLoginRequest, authLogoutRequest, authRegisterRequest, authVerifyEmailRequest } from "../../modules/auth/api/authApi";
import type { AxiosResponse } from "axios";
import type { AuthActionsType, AuthCheckAuthDataResponse, AuthGoogleRequestPayload, AuthLoginRequestPayload, AuthPublic, AuthRegisterSanitizedPayload, AuthVerifyEmailApiPayload } from "../../typings/auth/authTypes";
import { handleErrorWithAction, handleError } from "../shared/handlerStoreError";


export const startLoginWithEmailPassword = (
  { email, password, rememberMe }: AuthLoginRequestPayload): ThunkAction<Promise<AuthPublic | undefined>, RootState, unknown, AuthActionsType> => {

    // ─── 🔎 Sin checkingCredentials() acá 🔎 ───
    // Pone status: Checking en el slice global, y AppRouter usa ese status
    // para desmontar TODO (incluido LoginForm) y mostrar el spinner de
    // arranque. Al fallar el login, LoginForm se remonta de cero y su
    // useEffect de montaje llama a clearAuthError(), borrando el mensaje
    // de error antes de que se llegue a ver. El feedback de "procesando"
    // ya lo da isSubmitting en useLoginForm.
    return async (dispatch: Dispatch) => {
      try {
        const { user } : { user: AuthPublic} = await authLoginRequest({ email, password, rememberMe });

        if (!user) {
          dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
          throw new Error('No se recibió usuario válido');
        }

        dispatch(login({
          email: user.email,
          username: user.username,
          profilePhoto: user.profilePhoto,
          role: user.role,
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

export const startGoogleLogin = (
  { accessToken }: AuthGoogleRequestPayload
): ThunkAction<Promise<AuthPublic | undefined>, RootState, unknown, AuthActionsType> => {

    // Mismo motivo que startLoginWithEmailPassword: sin checkingCredentials() acá.
    return async (dispatch: Dispatch) => {
      try {
        const { user }: { user: AuthPublic } = await authGoogleRequest({ accessToken });

        if (!user) {
          dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
          throw new Error('No se recibió usuario válido');
        }

        dispatch(login({
          email: user.email,
          username: user.username,
          profilePhoto: user.profilePhoto,
          role: user.role,
          _id: user._id,
        }));

        return user as AuthPublic;
      } catch (error: unknown) {
        handleErrorWithAction({ error, dispatch, action: logout });
      }
    };
};

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

export const startCheckAuth = (): ThunkAction<Promise<AxiosResponse<{ status: number; data: AuthCheckAuthDataResponse }> | undefined>, RootState, unknown, AuthActionsType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authCheckStatusRequest();
      const { status, data } : { status: number, data: AuthCheckAuthDataResponse} = response;

      if (status !== 200) {
        // Sin esto, el status queda trabado en "Checking" para siempre
        dispatch(logout({ errorMessage: null }));
        return;
      }

      dispatch(login({
          email: data.email,
          username: data.username,
          profilePhoto: data.profilePhoto,
          role: data.role,
          _id: data._id,
        }));

      return response;
    } catch(error: unknown) {
        dispatch(logout({ errorMessage: null }));
    } 
  }
}

export const startVerifyEmail = (
  { token }: AuthVerifyEmailApiPayload
): ThunkAction<Promise<boolean>, RootState, unknown, AuthActionsType> => {

    return async (): Promise<boolean> => {
      try {
        await authVerifyEmailRequest({ token });
        return true;
      } catch (error: unknown) {
        // No usamos handleError acá: relanza el error, y este thunk necesita
        // resolver siempre a boolean para que el hook pueda setear el status.
        console.error('Email verification failed:', error);
        return false;
      }
    };
};