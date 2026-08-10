import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { previewReceiptThunk, confirmReceiptThunk } from "./receiptsThunks";
import type { store } from "../store";
import type { ReceiptImportResult, ReceiptPreviewResult, ReceiptState } from "@typings/receipt/receiptTypes";
import { ReceiptStatusEnum } from "@typings/receipt/receiptEnums";

const initialState: ReceiptState = {
    status:         ReceiptStatusEnum.Idle,
    preview:        null,
    result:         null,
    isLoading:      false,
    errorMessage:   null,
    uploadProgress: 0,
}

export const receiptSlice = createSlice({
    name: 'Receipt',
    initialState,
    reducers: {
        setReceiptUploadProgress: (state: ReceiptState, action: PayloadAction<number>) => {
            state.uploadProgress = action.payload;
        },

        // 🆕 vuelve al estado inicial: se usa para "Cancelar" en el modal
        // de confirmación y para arrancar una nueva carga desde cero.
        resetReceiptState: () => initialState,
    },
    extraReducers: (builder) => {
        builder
            .addCase(previewReceiptThunk.pending, (state) => {
                state.status         = ReceiptStatusEnum.Loading;
                state.isLoading      = true;
                state.errorMessage   = null;
                state.uploadProgress = 0;
                state.preview        = null;
            })
            .addCase(previewReceiptThunk.fulfilled, (state, action: PayloadAction<ReceiptPreviewResult>) => {
                state.status         = ReceiptStatusEnum.AwaitingConfirmation;
                state.preview        = action.payload;
                state.isLoading      = false;
                state.errorMessage   = null;
                state.uploadProgress = 100;
            })
            .addCase(previewReceiptThunk.rejected, (state, action) => {
                state.status         = ReceiptStatusEnum.Failed;
                state.errorMessage   = action.payload ?? "Ocurrió un error inesperado";
                state.isLoading      = false;
                state.uploadProgress = 0;
            })
            .addCase(confirmReceiptThunk.pending, (state) => {
                state.status       = ReceiptStatusEnum.Confirming;
                state.isLoading    = true;
                state.errorMessage = null;
            })
            .addCase(confirmReceiptThunk.fulfilled, (state, action: PayloadAction<ReceiptImportResult>) => {
                state.status       = ReceiptStatusEnum.Succeeded;
                state.result       = action.payload;
                state.preview      = null;
                state.isLoading    = false;
                state.errorMessage = null;
            })
            .addCase(confirmReceiptThunk.rejected, (state, action) => {
                state.status       = ReceiptStatusEnum.Failed;
                state.errorMessage = action.payload ?? "Ocurrió un error inesperado";
                state.isLoading    = false;
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