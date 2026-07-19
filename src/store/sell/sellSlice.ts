import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellStateErrorType, SellStateInterface, SellType } from '@typings/sells/sellTypes';


const initialState: SellStateInterface = {
    sells: [],
    sellSelected: null,
    isLoading: false,
    errorMessage: null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {
        setSells: (state: SellStateInterface, action: PayloadAction<SellType[]>) => {
            state.sells = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setSellSelected: (state: SellStateInterface, action: PayloadAction<SellType>) => {
            state.sellSelected = action.payload;
        },
        removeSell: (state: SellStateInterface, action: PayloadAction<string>) => {
            state.sells = state.sells.filter((s) => s._id !== action.payload);
        },
        setError: (state: SellStateInterface, action: PayloadAction<SellStateErrorType>) => {
            const { payload } = action;
            const { errorMessage } = payload;
            state.errorMessage = errorMessage;
        },
        checkingSells: (state: SellStateInterface) => {
            state.sells = [];
            state.isLoading = true;
            state.errorMessage = null;
        }
    }
});

export const { setSells, setSellSelected, setError, checkingSells, removeSell } = sellSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;