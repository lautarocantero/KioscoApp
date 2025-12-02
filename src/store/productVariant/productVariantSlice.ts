import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { ProductVariant, ProductVariantState } from "../../typings/productVariant/productVariant";


const initialState: ProductVariantState = {
    items: [],
    isLoading: false,
    errorMessage: null,
}

export const productVariantSlice = createSlice({
    name: 'productVariants',
    initialState,
    reducers: {
        setProductsVariants: (state: ProductVariantState, action: PayloadAction<ProductVariant[]>) => {
            const { payload } = action;
            state.items = payload;
            state.isLoading = false;
            state.errorMessage = null;
        }
    }
});

export const { setProductsVariants } = productVariantSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productVariantSlice.reducer;