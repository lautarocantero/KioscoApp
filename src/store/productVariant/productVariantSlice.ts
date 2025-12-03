import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { ProductVariant, ProductVariantState, ProductVariantStateError } from "../../typings/productVariant/productVariant";


const initialState: ProductVariantState = {
    productVariants: [],
    isLoading: false,
    errorMessage: null,
}

export const productVariantSlice = createSlice({
    name: 'productVariants',
    initialState,
    reducers: {
        setProductsVariants: (state: ProductVariantState, action: PayloadAction<ProductVariant[]>) => {
            state.productVariants = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setError: (state: ProductVariantState, action: PayloadAction<ProductVariantStateError> ) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        checkingProductVariants: (state: ProductVariantState) => {
            state.productVariants = [];
            state.isLoading = false;
            state.errorMessage = null;
        }
    }
});

export const { setProductsVariants, setError, checkingProductVariants } = productVariantSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default productVariantSlice.reducer;