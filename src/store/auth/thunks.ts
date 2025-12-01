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