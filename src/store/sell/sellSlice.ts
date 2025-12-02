import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';


const initialState: SellState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {

    }
});

// export const {} = sellSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;