import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { uploadReceiptThunk } from "./receiptsThunks";
import type { store } from "../store";
import type { ReceiptImportResult, ReceiptState } from "@typings/receipt/receiptTypes";

const initialState: ReceiptState = {
    status:         "idle",
    result:         null,
    isLoading:      false,
    error:          null,
    errorMessage:   null,
    uploadProgress: 0,
}

export const receiptSlice = createSlice({
    name: 'Receipt',
    initialState,
    reducers: {
        // 🆕 progreso de subida (0-100), emitido por onUploadProgress de axios
        setReceiptUploadProgress: (state: ReceiptState, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },

        // vuelve al estado inicial, ej. al desmontar la página o antes de un nuevo upload
        resetReceiptState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(uploadReceiptThunk.pending, (state) => {
                state.status         = "loading";
                state.isLoading      = true;
                state.error          = null;
                state.errorMessage   = null;
                state.uploadProgress = 0;
            })
            .addCase(uploadReceiptThunk.fulfilled, (state, action: PayloadAction<ReceiptImportResult>) => {
                state.status         = "succeeded";
                state.result         = action.payload;
                state.isLoading      = false;
                state.error          = null;
                state.errorMessage   = null;
                state.uploadProgress = 100;
            })
            .addCase(uploadReceiptThunk.rejected, (state, action) => {
                const message = action.payload ?? "Ocurrió un error inesperado";
                state.status         = "failed";
                state.error          = message;
                state.errorMessage   = message;
                state.isLoading      = false;
                state.uploadProgress = 0;
            });
    },
});

export const {
    setReceiptUploadProgress,
    resetReceiptState,
} = receiptSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default receiptSlice.reducer;