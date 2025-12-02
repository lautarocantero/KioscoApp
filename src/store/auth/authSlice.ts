import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import { AuthStatus } from '../../typings/auth/enums';
import type { AuthLoginSlicePayload, AuthSliceErrorPayload, AuthSliceState } from '../../typings/auth/authTypes';


const initialState: AuthSliceState = {
    _id: null,  
    username: '',  
    email: '',
    status: AuthStatus.Checking,
    profilePhoto: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state: AuthSliceState, action: PayloadAction<AuthLoginSlicePayload>) => {
            const { payload } = action;
            const {_id , username, email,  profilePhoto } = payload;
            state._id = _id;
            state.username = username ?? '';
            state.email = email ?? '';
            state.status = AuthStatus.Authenticated;
            state.profilePhoto = profilePhoto ?? null;
            state.errorMessage = null
        },
        logout: (state: AuthSliceState, action: PayloadAction<AuthSliceErrorPayload>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.status = AuthStatus.NotAuthenticated;
            state.email = '';
            state.username = '';
            state.profilePhoto = null;
            state._id = null;
            state.errorMessage = errorMessage ?? null;
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