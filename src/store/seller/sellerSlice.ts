import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellerAddToCartSlicePayload, SellerError, SellerSetProductSlicePayload, SellerStateInterface } from '../../typings/seller/sellerTypes';


const initialState: SellerStateInterface = {
    _id: null,
    name: '',
    cart: [],
    productSelected: null,
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {
        setProductSelected: (state: SellerStateInterface, action: PayloadAction<SellerSetProductSlicePayload>) => {
            const { payload } = action;
            const { product } = payload;
            state.productSelected = product;
        },
        addToCartAction: (state: SellerStateInterface, action: PayloadAction<SellerAddToCartSlicePayload>) => {
            const { payload } = action;
            const { product } = payload;
            state.cart = [...state.cart, product];
        },
        setError: (state: SellerStateInterface, action: PayloadAction<SellerError>) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        }
    }
});

export const { setProductSelected, addToCartAction, setError } = sellerSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellerSlice.reducer;