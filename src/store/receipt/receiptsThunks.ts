import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReceiptImportResult, ReceiptPreviewResult } from "@typings/receipt/receiptTypes";
import { previewReceiptRequest, confirmReceiptRequest } from "../../modules/receipt/api/receiptsApi";
import { setReceiptUploadProgress } from "./receiptsSlice";

export const previewReceiptThunk = createAsyncThunk<ReceiptPreviewResult, File, { rejectValue: string }>(
  "receipts/preview",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      return await previewReceiptRequest(file, (percent) => {
        dispatch(setReceiptUploadProgress(percent));
      });
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Error al analizar el archivo.");
    }
  },
);

export const confirmReceiptThunk = createAsyncThunk<ReceiptImportResult, ReceiptPreviewResult, { rejectValue: string }>(
  "receipts/confirm",
  async (preview, { rejectWithValue }) => {
    try {
      return await confirmReceiptRequest(preview);
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Error al confirmar la importación.");
    }
  },
);