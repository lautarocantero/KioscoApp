import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SellerAddToCartSlicePayload, SellerAddUnitActionPayload, SellerError, SellerRemoveFromCartActionPayload, SellerSetProductSlicePayload, SellerStateInterface, SortOption, ViewMode } from '../../typings/seller/sellerTypes';
import type { store } from '../store';
import { CartAmount } from '../../typings/seller/seller';

const initialState: SellerStateInterface = {
    _id: null,
    name: '',
    cart: [],
    productSelected: null,
    description: '',
    created_at: '',
    updated_at: '',
    errorMessage: null,
    sort: 'name-asc',
    viewMode: 'grid',
    page: 1,
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
        addUnitAction: (state: SellerStateInterface, action: PayloadAction<SellerAddUnitActionPayload>) => {
            const { payload } = action;
            const { _id } = payload;

            const productIndex = state.cart.findIndex(item => item._id === String(_id)); 
            if (productIndex !== -1) { 
                state.cart[productIndex].stock_required += 1; 
            }
        },
        removeFromCart: (state: SellerStateInterface, action: PayloadAction<SellerRemoveFromCartActionPayload>) => {
            const { payload } = action;
            const { _id, amount} = payload;

            const productIndex = state.cart.findIndex(item => item._id === String(_id)); 
            if (productIndex === -1) return;

            if(amount === CartAmount.One) state.cart[productIndex].stock_required -= 1; 
            if(amount === CartAmount.All) state.cart[productIndex].stock_required = 0; 

            if (state.cart[productIndex].stock_required <= 0) { state.cart = state.cart.filter((item) => item._id !== String(_id)); }
        },
        cleanCart: (state: SellerStateInterface) => {
            state.cart = []
        },
        setError: (state: SellerStateInterface, action: PayloadAction<SellerError>) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        setSort: (state: SellerStateInterface, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
            state.page = 1;
        },
        setViewMode: (state: SellerStateInterface, action: PayloadAction<ViewMode>) => {
            state.viewMode = action.payload;
        },
        setPage: (state: SellerStateInterface, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
    }
});

export const {
  setProductSelected,
  addToCartAction,
  addUnitAction,
  removeFromCart,
  cleanCart,
  setError,
  setSort,
  setViewMode,
  setPage,
} = sellerSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellerSlice.reducer;
