import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Seller, SellerSliceState } from "@typings/seller/sellerPersonTypes";


const initialState: SellerSliceState = {
    sellers:      [],
    isLoading:    false,
    errorMessage: null,
};

export const sellerSlice = createSlice({
    name: "SellerPerson",
    initialState,
    reducers: {

        setSellers: (state: SellerSliceState, action: PayloadAction<Seller[]>) => {
            state.sellers      = action.payload;
            state.isLoading    = false;
            state.errorMessage = null;
        },

        checkingSellers: (state: SellerSliceState) => {
            state.sellers      = [];
            state.isLoading    = true;
            state.errorMessage = null;
        },

        setSellersError: (state: SellerSliceState, action: PayloadAction<string>) => {
            state.isLoading    = false;
            state.errorMessage = action.payload;
        },
    },
});

export const { setSellers, checkingSellers, setSellersError } = sellerSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default sellerSlice.reducer;