import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { AuthErrorPayload, AuthLoginPayload, AuthSliceState } from '../../typings/auth/authTypes';
import { AuthStatus } from '../../typings/auth/enums';


const initialState: AuthSliceState = {
    status: AuthStatus.Checking,
    _id: null,    
    email: '',
    username: '',
    profilePhoto: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthSliceState, payload: AuthLoginPayload) => {
            state.status = AuthStatus.Authenticated;
            state.email = payload?.email;
            state.username = payload?.displayName;
            state.profilePhoto = payload?.photoUrl;
            state._id = payload?.uid;
            state.errorMessage = null;
        },
        logout: (state: AuthSliceState, action: PayloadAction<AuthErrorPayload | undefined>) => {
            state.status = AuthStatus.NotAuthenticated;
            state.email = '';
            state.username = '';
            state.profilePhoto = null;
            state._id = null;
            state.errorMessage = action?.payload?.errorMessage;
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