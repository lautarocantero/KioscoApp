import { createAsyncThunk } from "@reduxjs/toolkit";
import type { ReceiptImportResult } from "@typings/receipt/receiptComponentTypes";
import { uploadReceiptRequest } from "../../modules/receipt/api/receiptsApi";

export const uploadReceiptThunk = createAsyncThunk<ReceiptImportResult, File, { rejectValue: string }>(
  "receipts/upload",
  async (file, { rejectWithValue }) => {
    try {
      return await uploadReceiptRequest(file);
    } catch (err: any) {
      return rejectWithValue(err?.response?.data?.message ?? "Error al subir el archivo.");
    }
  },
);