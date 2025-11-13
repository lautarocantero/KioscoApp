import type { Dispatch, ThunkAction } from "@reduxjs/toolkit"
import { checkingCredentials, login, logout, type RootState } from "./authSlice";
import { authLoginRequest, authLogoutRequest } from "../../modules/auth/api/authApi";
import type { AuthLoginData, AuthPublic } from "../../typings/auth/authTypes";

export const startLoginWithEmailPassword = (
  { email, password }: AuthLoginData
): ThunkAction<Promise<AuthPublic | null>, RootState, unknown, ReturnType<typeof login>> => {
  return async (dispatch) => {
    dispatch(checkingCredentials());
    try {
      const { user } = await authLoginRequest({ email, password });

      if (!user) {
        dispatch(logout({ errorMessage: 'No se recibió usuario válido' }));
        throw new Error('No se recibió usuario válido');
      }

      dispatch(login({
        email,
        username: user.username,
        profilePhoto: null,
        id: user._id,
      }));

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