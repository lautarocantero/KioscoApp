import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Product, ProductState } from "../../typings/product/productTypes";

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
            const { payload } = action;
            state.products = payload;
            state.isLoading = false;
            state.errorMessage = null;
        }
    }
});

export const { setProducts } = productSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;