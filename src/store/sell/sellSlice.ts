import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellStateErrorType, SellStateInterface, SellTicketType } from '@typings/sells/sellTypes';

const initialState: SellStateInterface = {
    sells:             [],
    currentSell:       null,
    isLoading:         false,
    errorMessage:      null,
    isLoadingCurrent:  false,
    currentSellError:  null,
}

export const sellSlice = createSlice({
    name: 'sell',
    initialState,
    reducers: {

        setSells: (state: SellStateInterface, action: PayloadAction<SellTicketType[]>) => {
            state.sells        = action.payload;
            state.isLoading    = false;
            state.errorMessage = null;
        },

        setCurrentSell: (state: SellStateInterface, action: PayloadAction<SellTicketType>) => {
            state.currentSell      = action.payload;
            state.isLoadingCurrent = false;
            state.currentSellError = null;
        },

        clearCurrentSell: (state: SellStateInterface) => {
            state.currentSell = null;
        },

        setError: (state: SellStateInterface, action: PayloadAction<SellStateErrorType>) => {
            state.errorMessage = action.payload.errorMessage;
            state.isLoading    = false;
        },

        checkingSells: (state: SellStateInterface) => {
            state.sells        = [];
            state.isLoading    = true;
            state.errorMessage = null;
        },

        checkingCurrentSell: (state: SellStateInterface) => {
            state.isLoadingCurrent = true;
            state.currentSellError = null;
        },

        setCurrentSellError: (state: SellStateInterface, action: PayloadAction<string>) => {
            state.isLoadingCurrent = false;
            state.currentSellError = action.payload;
        },

        removeSell: (state: SellStateInterface, action: PayloadAction<string>) => {
            state.sells = state.sells.filter((s) => s._id !== action.payload);
        },
    }
});

export const {
    setSells,
    setCurrentSell,
    clearCurrentSell,
    setError,
    checkingSells,
    checkingCurrentSell,
    setCurrentSellError,
    removeSell,
} = sellSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default sellSlice.reducer;