import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Product, ProductState, ProductStateError } from "../../typings/product/productTypes";

const initialState: ProductState = {
    products: [],
    isLoading: false,
    errorMessage: null,
}

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {
        setProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: ProductState, action: PayloadAction<ProductStateError>) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        checkingProducts: (state: ProductState) => {
            state.products = [];
            state.isLoading = true;
            state.errorMessage = null;
        }
    }
});

export const { setProducts , setError, checkingProducts } = productSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;