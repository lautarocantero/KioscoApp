import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import { AuthRoleEnum, AuthStatus } from '../../typings/auth/authEnums';
import type { AuthLoginSlicePayload, AuthSliceErrorPayload, AuthSliceState } from '../../typings/auth/authTypes';


const initialState: AuthSliceState = {
    _id: null,
    username: '',
    email: '',
    status: AuthStatus.Checking,
    isLoading: true,
    isAuthenticated: false,
    profilePhoto: null,
    errorMessage: null,
    role: AuthRoleEnum.Usuario,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthSliceState, action: PayloadAction<AuthLoginSlicePayload>) => {
            const { payload } = action;
            const { _id, username, email, profilePhoto, role } = payload;
            state._id = _id;
            state.username = username ?? '';
            state.email = email ?? '';
            state.status = AuthStatus.Authenticated;
            state.isLoading = false;
            state.isAuthenticated = true;
            state.profilePhoto = profilePhoto ?? null;
            state.role = role;
            state.errorMessage = null;
        },
        logout: (state: AuthSliceState, action: PayloadAction<AuthSliceErrorPayload>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.status = AuthStatus.NotAuthenticated;
            state.isLoading = false;
            state.isAuthenticated = false;
            state.email = '';
            state.username = '';
            state.profilePhoto = null;
            state._id = null;
            state.role = AuthRoleEnum.Usuario;
            state.errorMessage = errorMessage ?? null;
        },
        checkingCredentials: (state: AuthSliceState) => {
            state.status = AuthStatus.Checking;
            state.isLoading = true;
            state.isAuthenticated = false;
        },
        clearAuthError: (state: AuthSliceState) => {
            state.errorMessage = null;
        }
    }
});

//recordar que el default son los reducers
export const { login, logout, checkingCredentials, clearAuthError } = authSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default authSlice.reducer;