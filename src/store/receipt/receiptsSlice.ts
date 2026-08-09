import { createSlice } from "@reduxjs/toolkit";
import { uploadReceiptThunk } from "./receiptsThunks";
import type { ReceiptsState } from "@typings/receipt/receiptTypes";


const initialState: ReceiptsState = { status: "idle", result: null, error: null };

const receiptsSlice = createSlice({
  name: "receipts",
  initialState,
  reducers: {
    resetReceiptState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(uploadReceiptThunk.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(uploadReceiptThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.result = action.payload;
      })
      .addCase(uploadReceiptThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload ?? "Error desconocido";
      });
  },
});

export const { resetReceiptState } = receiptsSlice.actions;
export default receiptsSlice.reducer;