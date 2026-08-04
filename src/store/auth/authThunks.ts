import type { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { clearAuthError, login, logout, type AppDispatch, type RootState } from "./authSlice";
import { authCheckStatusRequest, authGoogleRequest, authLoginRequest, authLogoutRequest, authRegisterRequest, authRequestPasswordResetRequest, authResetPasswordRequest } from "../../modules/auth/api/authApi";
import type { AxiosResponse } from "axios";
import type { 
  AuthActionsType, AuthAsyncActionResult, AuthCheckAuthDataResponse, AuthGoogleRequestPayload, 
  AuthLoginRequestPayload, AuthPublic, AuthRegisterSanitizedPayload, AuthRequestPasswordResetPayload, 
  AuthRequestPasswordResetResult, 
  AuthResetPasswordPayload } from "../../typings/auth/authTypes";
import { extractAuthErrorMessage, handleErrorWithAction, handleError } from "../shared/handlerStoreError";


export const startLoginWithEmailPassword = (
  { email, password, rememberMe }: AuthLoginRequestPayload): ThunkAction<Promise<AuthPublic | undefined>, RootState, unknown, AuthActionsType> => {

    // Sin checkingCredentials() acá: ver nota en el bug de "se reinicia todo".
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

/*══════════ 🎮 startVerifyEmail ══════════╗
║ ⏸️ DESHABILITADO temporalmente: depende del ║
║ mail de verificación que Resend free no      ║
║ puede entregar a terceros. Reactivar cuando  ║
║ se pague Resend.                             ║
╚═══════════════════════════════════════════════╝*/
// export const startVerifyEmail = (
//   { token }: AuthVerifyEmailApiPayload
// ): ThunkAction<Promise<boolean>, RootState, unknown, AuthActionsType> => {

//     return async (): Promise<boolean> => {
//       try {
//         await authVerifyEmailRequest({ token });
//         return true;
//       } catch (error: unknown) {
//         console.error('Email verification failed:', error);
//         return false;
//       }
//     };
// };

/*══════════ 🎮 startRequestPasswordReset ══════════╗
║ 📥 Entrada: AuthRequestPasswordResetPayload {email} ║
║ ⚙️ Proceso: pide el reset. No toca el slice global.  ║
║                                                        ║
║ 🚧 BYPASS TEMPORAL (sin Resend pago): el backend ya no ║
║ manda el link por mail, lo devuelve directo acá. Por    ║
║ eso el thunk ahora también devuelve el token, para que  ║
║ el form navegue directo a /reset-password?token=...     ║
║ Cuando se reactive Resend: volver a AuthAsyncActionResult║
║ (sin token) y restaurar la pantalla de "revisá tu email" ║
║ en ForgotPasswordForm.                                    ║
║ 📤 Salida: AuthRequestPasswordResetResult                 ║
╚═══════════════════════════════════════════════════════════╝*/
export const startRequestPasswordReset = (
  { email }: AuthRequestPasswordResetPayload
): ThunkAction<Promise<AuthRequestPasswordResetResult>, RootState, unknown, AuthActionsType> => {

    return async (): Promise<AuthRequestPasswordResetResult> => {
      try {
        const { token } = await authRequestPasswordResetRequest({ email });
        return { success: true, errorMessage: null, token: token ?? null };
      } catch (error: unknown) {
        console.error('Request password reset failed:', error);
        return { success: false, errorMessage: extractAuthErrorMessage(error), token: null };
      }
    };
};

/*══════════ 🎮 startResetPassword ══════════╗
║ 📥 Entrada: AuthResetPasswordPayload {token,newPassword,repeatNewPassword} ║
║ ⚙️ Proceso: aplica la nueva contraseña. Tampoco toca el ║
║    slice global: el usuario todavía no está logueado.    ║
║ 📤 Salida: AuthAsyncActionResult                            ║
╚═════════════════════════════════════════════════════════════╝*/
export const startResetPassword = (
  { token, newPassword, repeatNewPassword }: AuthResetPasswordPayload
): ThunkAction<Promise<AuthAsyncActionResult>, RootState, unknown, AuthActionsType> => {

    return async (): Promise<AuthAsyncActionResult> => {
      try {
        await authResetPasswordRequest({ token, newPassword, repeatNewPassword });
        return { success: true, errorMessage: null };
      } catch (error: unknown) {
        console.error('Reset password failed:', error);
        return { success: false, errorMessage: extractAuthErrorMessage(error) };
      }
    };
};