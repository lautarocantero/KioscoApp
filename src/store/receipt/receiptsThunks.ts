import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReceiptImportResult } from "@typings/receipt/receiptComponentTypes";
import { uploadReceiptRequest } from "../../modules/receipt/api/receiptsApi";
import { setReceiptUploadProgress } from "./receiptsSlice";

export const uploadReceiptThunk = createAsyncThunk<ReceiptImportResult, File, { rejectValue: string }>(
  "receipts/upload",
  async (file, { dispatch, rejectWithValue }) => {
    try {
      return await uploadReceiptRequest(file, (percent) => {
        dispatch(setReceiptUploadProgress(percent));
      });
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Error al subir el archivo.");
    }
  },
);