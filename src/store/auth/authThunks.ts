import type { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { clearAuthError, login, logout, type AppDispatch, type RootState } from "./authSlice";
import { authCheckStatusRequest, authGoogleRequest, authLoginRequest, authLogoutRequest, authRegisterRequest, authRequestPasswordResetRequest, authResetPasswordRequest } from "../../modules/auth/api/authApi";
import type { AxiosResponse } from "axios";
import type {
  AuthActionsType, AuthAsyncActionResult, AuthCheckAuthDataResponse, AuthGoogleRequestPayload,
  AuthLoginRequestPayload, AuthPublic, AuthRegisterSanitizedPayload, AuthRequestPasswordResetPayload,
  AuthRequestPasswordResetResult,
  AuthResetPasswordPayload } from "../../typings/auth/authTypes";
import { extractAuthErrorMessage, handleErrorWithAction } from "../shared/handlerStoreError";
import { setActiveKioscoId, setMyKioscos, resetKioscoState } from "../kiosco/kioscoSlice";
import { ACTIVE_KIOSCO_STORAGE_KEY } from "../../config/constants";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";


export const startLoginWithEmailPassword = (
  { email, password, rememberMe }: AuthLoginRequestPayload): ThunkAction<Promise<AuthPublic | undefined>, RootState, unknown, AuthActionsType> => {

    // Sin checkingCredentials() acá: ver nota en el bug de "se reinicia todo".
    return async (dispatch: Dispatch) => {
      try {
        const { user, myKioscos } : { user: AuthPublic; myKioscos: KioscoWithStats[] } = await authLoginRequest({ email, password, rememberMe });

        if (!user) {
          dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
          throw new Error('No se recibió usuario válido');
        }

        dispatch(login({
          email: user.email,
          name: user.name,
          profilePhoto: user.profilePhoto,
          isVerified: user.isVerified,
          _id: user._id,
        }));
        dispatch(setMyKioscos({ kioscos: myKioscos ?? [] }));

        return user as AuthPublic;
      } catch (error: unknown) {
        handleErrorWithAction({error, dispatch, action: logout});
      }
    };
};

export const startRegister = (
  { sanitizedData } : AuthRegisterSanitizedPayload): ThunkAction<Promise<string | undefined>, RootState, undefined, AnyAction> => {
    const { name, email, password, repeatPassword, profilePhoto } = sanitizedData;

    return async (dispatch: AppDispatch): Promise<string | undefined> => {
      try{
        // 🔧 Fix: el backend devuelve { id, message }, no un string suelto
        const { id } : { id: string } = await authRegisterRequest({ name, email, password, repeatPassword, profilePhoto });

        if(!id) {
          dispatch(logout({ errorMessage: 'No se pudo registrar al usuario, intente de nuevo' }));
          throw new Error('Error durante el  registro');
        }

        dispatch(clearAuthError());
        return id;
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
        const { user, myKioscos }: { user: AuthPublic; myKioscos: KioscoWithStats[] } = await authGoogleRequest({ accessToken });

        if (!user) {
          dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
          throw new Error('No se recibió usuario válido');
        }

        dispatch(login({
          email: user.email,
          name: user.name,
          profilePhoto: user.profilePhoto,
          isVerified: user.isVerified,
          _id: user._id,
        }));
        dispatch(setMyKioscos({ kioscos: myKioscos ?? [] }));

        return user as AuthPublic;
      } catch (error: unknown) {
        handleErrorWithAction({ error, dispatch, action: logout });
      }
    };
};

// Devuelve si el logout en el server salió bien. Antes, un fallo acá
// (ej. el back no llega a revocar la cookie) quedaba silencioso: se
// relanzaba como promise rejection sin catch en el caller y el usuario
// veía la sesión "cerrada" en el tab actual sin enterarse de que el
// server pudo no haber invalidado nada.
export const startLogout = (): ThunkAction<Promise<boolean>, RootState, unknown, AuthActionsType> => {
    return async (dispatch: Dispatch): Promise<boolean> => {
        let serverLogoutSucceeded = true;

        try {
            await authLogoutRequest();
        } catch (error: unknown) {
            serverLogoutSucceeded = false;
            console.error("No se pudo cerrar sesión en el server:", error);
        } finally {
            // Limpia sesión de auth Y de kiosco: la próxima cuenta que se
            // loguee en este navegador no debe heredar el kiosco activo.
            dispatch(logout({ errorMessage: null }));
            dispatch(resetKioscoState());
            dispatch(setActiveKioscoId({ kioscoId: null }));
            localStorage.removeItem(ACTIVE_KIOSCO_STORAGE_KEY);
        }

        return serverLogoutSucceeded;
    }
}

export const startCheckAuth = (): ThunkAction<Promise<AxiosResponse<{ status: number; data: AuthCheckAuthDataResponse & { myKioscos: KioscoWithStats[] } }> | undefined>, RootState, unknown, AuthActionsType> => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await authCheckStatusRequest();
      const { status, data } : { status: number, data: AuthCheckAuthDataResponse & { myKioscos: KioscoWithStats[] } } = response;

      if (status !== 200) {
        dispatch(logout({ errorMessage: null }));
        return;
      }

      dispatch(login({
        email: data.email,
        name: data.name,
        profilePhoto: data.profilePhoto,
        isVerified: data.isVerified,
        _id: data._id,
      }));
      dispatch(setMyKioscos({ kioscos: data.myKioscos ?? [] }));

      return response;
    } catch {
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

// La edición de rol de un vendedor ahora es por-kiosco — ver
// updateKioscoMemberRoleThunk en store/kiosco/kioscoThunks.ts.