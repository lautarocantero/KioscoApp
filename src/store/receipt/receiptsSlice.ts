import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { ReceiptImportResult, ReceiptState, ReceiptStateError } from "@typings/receipt/receiptTypes";

const initialState: ReceiptState = {
    status:       "idle",
    result:       null,
    isLoading:    false,
    error:        null,
    errorMessage: null,
}

export const receiptSlice = createSlice({
    name: 'Receipt',
    initialState,
    reducers: {

        checkingReceiptUpload: (state: ReceiptState) => {
            state.status       = "loading";
            state.isLoading    = true;
            state.error        = null;
            state.errorMessage = null;
        },

        setReceiptResult: (state: ReceiptState, action: PayloadAction<ReceiptImportResult>) => {
            state.status       = "succeeded";
            state.result       = action.payload;
            state.isLoading    = false;
            state.error        = null;
            state.errorMessage = null;
        },

        setReceiptError: (state: ReceiptState, action: PayloadAction<ReceiptStateError>) => {
            state.status       = "failed";
            state.error        = action.payload.errorMessage;
            state.errorMessage = action.payload.errorMessage;
            state.isLoading    = false;
        },

        // 🆕 vuelve al estado inicial, ej. al desmontar la página o antes de un nuevo upload
        resetReceiptState: () => initialState,
    }
});

export const {
    checkingReceiptUpload,
    setReceiptResult,
    setReceiptError,
    resetReceiptState,
} = receiptSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default receiptSlice.reducer;