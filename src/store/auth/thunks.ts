import type { AnyAction, Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { checkingCredentials, login, logout, type RootState } from "./authSlice";
import { authCheckStatusRequest, authLoginRequest, authLogoutRequest } from "../../modules/auth/api/authApi";
import type { AuthLoginData, AuthPublic } from "../../typings/auth/authTypes";

export const startLoginWithEmailPassword = (
  { email, password }: AuthLoginData): ThunkAction<Promise<AuthPublic | null>, RootState, unknown, ReturnType<typeof login>> => {
  
    return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      // TO DO agregar token _token, _refreshToken, 
      const { user } = await authLoginRequest({ email, password });

      if (!user) {
        dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
        throw new Error('No se recibió usuario válido');
      }

      dispatch(login({
        email: user.email,
        username: user.username,
        profilePhoto: user.photoUrl,
        _id: user._id,
      }));

      //agregar cookies

      return user;
    } catch (error: unknown) {
      dispatch(logout());
      if (error instanceof Error) {
        throw new Error(error.message);
      } else {
        throw new Error('Something went wrong while login, retry please.');
      }
    }
  };
};

//nunca agregue persistencia de datos xd, hacerlo

export const startLogout = (): ThunkAction<void, RootState, unknown, ReturnType<typeof logout>> => {
    return async(dispatch: Dispatch) => {
        try{
            await authLogoutRequest();
            dispatch(logout())
        } catch(error: unknown) {
            if (error instanceof Error) {
              throw new Error(error.message);
            } else {
              throw new Error('Something went wrong while logout, retry please.');
            }
        }
    }
}

export const startCheckAuth = (): ThunkAction<void, RootState, unknown, AnyAction> => {
  return async () => {
    try {
      const response = await authCheckStatusRequest();
      return response;
    } catch(error: unknown) {
        if (error instanceof Error) {
          throw new Error(error.message);
        } else {
          throw new Error('Something went wrong while logout, retry please.');
        }
    } 
  }
}