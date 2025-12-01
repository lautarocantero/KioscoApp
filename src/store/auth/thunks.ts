import type { Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { checkingCredentials, login, logout, type RootState } from "./authSlice";
import { authCheckStatusRequest, authLoginRequest, authLogoutRequest } from "../../modules/auth/api/authApi";
import type { AxiosResponse } from "axios";
import type { AuthCheckAuthDataResponse, AuthCheckAutResponse, AuthLoginRequestPayload, AuthPublic } from "../../typings/auth/authTypes";
import handleError from "../shared/handlerStoreError";

type AuthActionsType = | ReturnType<typeof checkingCredentials> | ReturnType<typeof login> | ReturnType<typeof logout>;

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
        dispatch(logout({ errorMessage: null}));
        handleError(error);
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