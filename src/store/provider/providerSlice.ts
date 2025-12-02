import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';


const initialState: ProviderState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const providerSlice = createSlice({
    name: 'provider',
    initialState,
    reducers: {

    }
});

export const {} = providerSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default providerSlice.reducer;