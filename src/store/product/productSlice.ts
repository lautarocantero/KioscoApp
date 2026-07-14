import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Product, ProductState, ProductStateError, ProductWithPresentations } from "../../typings/product/productTypes";

const initialState: ProductState = {
    products:            [],
    currentProduct:      null,
    isLoading:           false,
    errorMessage:        null,
    isLoadingCurrent:    false,
    currentProductError: null,
}

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {

        setProducts: (state: ProductState, action: PayloadAction<ProductWithPresentations[]>) => {
            state.products     = action.payload;
            state.isLoading    = false;
            state.errorMessage = null;
        },

        setCurrentProduct: (state: ProductState, action: PayloadAction<Product>) => {
            state.currentProduct      = action.payload;
            state.isLoadingCurrent    = false;
            state.currentProductError = null;
        },

        clearCurrentProduct: (state: ProductState) => {
            state.currentProduct = null;
        },

        setError: (state: ProductState, action: PayloadAction<ProductStateError>) => {
            state.errorMessage = action.payload.errorMessage;
            state.isLoading    = false;
        },

        checkingProducts: (state: ProductState) => {
            state.products     = [];
            state.isLoading    = true;
            state.errorMessage = null;
        },

        // 🆕 loading/error puntual para el producto actual (no toca la lista)
        checkingCurrentProduct: (state: ProductState) => {
            state.isLoadingCurrent    = true;
            state.currentProductError = null;
        },

        setCurrentProductError: (state: ProductState, action: PayloadAction<string>) => {
            state.isLoadingCurrent    = false;
            state.currentProductError = action.payload;
        },

        // 🆕 borra un producto de la lista sin necesidad de refetch
        removeProduct: (state: ProductState, action: PayloadAction<string>) => {
            state.products = state.products.filter((p) => p._id !== action.payload);
        },
    }
});

export const {
    setProducts,
    setCurrentProduct,
    clearCurrentProduct,
    setError,
    checkingProducts,
    checkingCurrentProduct,
    setCurrentProductError,
    removeProduct,
} = productSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;