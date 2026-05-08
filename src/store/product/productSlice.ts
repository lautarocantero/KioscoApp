import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Product, ProductState, ProductStateError } from "../../typings/product/productTypes";

const initialState: ProductState = {
    products:       [],
    currentProduct: null,
    isLoading:      false,
    errorMessage:   null,
}

export const productSlice = createSlice({
    name: 'Product',
    initialState,
    reducers: {

        setProducts: (state: ProductState, action: PayloadAction<Product[]>) => {
            state.products     = action.payload;
            state.isLoading    = false;
            state.errorMessage = null;
        },

        // ─── Guarda el producto recién creado (o el que se está editando) ───
        setCurrentProduct: (state: ProductState, action: PayloadAction<Product>) => {
            state.currentProduct = action.payload;
        },

        // ─── Limpia el producto del store (logout, navegación fuera del flujo) ───
        clearCurrentProduct: (state: ProductState) => {
            state.currentProduct = null;
        },

        setError: (state: ProductState, action: PayloadAction<ProductStateError>) => {
            state.errorMessage = action.payload.errorMessage;
        },

        checkingProducts: (state: ProductState) => {
            state.products     = [];
            state.isLoading    = true;
            state.errorMessage = null;
        },
    }
});

export const {
    setProducts,
    setCurrentProduct,
    clearCurrentProduct,
    setError,
    checkingProducts,
} = productSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default productSlice.reducer;