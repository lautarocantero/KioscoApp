import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
    type CartAddToCartSlicePayload,
    type CartAddUnitActionPayload,
    type CartError,
    type CartRemoveFromCartActionPayload,
    type CartSetPresentationSlicePayload,
    type CartSetProductSlicePayload,
    type CartStateInterface
} from '../../typings/cart/cartTypes';
import type { store } from '../store';
import { CartAmount, SortOption, ViewMode } from '../../typings/cart/cartEnums';
import type { Presentation } from '@typings/presentation/presentationTypes';
import type { Product } from '@typings/product/productTypes';
import type { PresentationCategory } from '@typings/presentation/presentationEnum';
import { isWeightSaleType } from '../../modules/shared/helpers/saleTypeHelper';
import { clampStock } from '../../utils/formatter/clampStock';

const initialState: CartStateInterface = {
    _id: null,
    cart: [],
    productSelected: null,
    presentationSelected: null,
    presentations: [],
    presentationsLoading: false,
    products: [],
    productsLoading: false,
    errorMessage: null,
    sort: SortOption.NameAsc,
    viewMode: ViewMode.Grid,
    page: 1,
    selectedCategory: null,
    searchTerm: '',
    exactMatch: false,
}

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setProductSelected: (state: CartStateInterface, action: PayloadAction<CartSetProductSlicePayload>) => {
            const { payload } = action;
            const { product } = payload;

            state.productSelected = product;
        },
        setPresentationSelected: (state: CartStateInterface, action: PayloadAction<CartSetPresentationSlicePayload>) => {
            const { payload } = action;
            const { presentation } = payload;

            state.presentationSelected = presentation;
        },
        addToCartAction: (state: CartStateInterface, action: PayloadAction<CartAddToCartSlicePayload>) => {
            const { payload } = action;
            const { product } = payload;

            const existingItemIndex = state.cart.findIndex((item) => item._id === product._id);

            if (existingItemIndex !== -1) {
                state.cart[existingItemIndex] = {
                    ...state.cart[existingItemIndex],
                    stock_required: state.cart[existingItemIndex].stock_required + product.stock_required,
                };
                return;
            }

            state.cart = [...state.cart, product];
        },
        addUnitAction: (state: CartStateInterface, action: PayloadAction<CartAddUnitActionPayload>) => {
            const { payload } = action;
            const { _id } = payload;

            const productIndex = state.cart.findIndex(item => item._id === String(_id));
            if (productIndex === -1) return;

            const item = state.cart[productIndex];
            const step = isWeightSaleType(item.sale_type) ? 100 : 1;
            const maxAvailable = item.stock === undefined ? Infinity : clampStock(item.stock);

            state.cart[productIndex].stock_required = Math.max(0, Math.min(item.stock_required + step, maxAvailable));
        },
        removeFromCart: (state: CartStateInterface, action: PayloadAction<CartRemoveFromCartActionPayload>) => {
            const { payload } = action;
            const { _id, amount } = payload;

            const productIndex = state.cart.findIndex(item => item._id === String(_id));
            if (productIndex === -1) return;

            const step = isWeightSaleType(state.cart[productIndex].sale_type) ? 100 : 1;

            if (amount === CartAmount.One) state.cart[productIndex].stock_required -= step;
            if (amount === CartAmount.All) state.cart[productIndex].stock_required = 0;

            if (state.cart[productIndex].stock_required <= 0) {
                state.cart = state.cart.filter((item) => item._id !== String(_id));
            }
        },
        cleanCart: (state: CartStateInterface) => {
            state.cart = []
        },
        setError: (state: CartStateInterface, action: PayloadAction<CartError>) => {
            const { payload } = action;
            const { errorMessage } = payload;

            state.errorMessage = errorMessage;
        },
        setSort: (state: CartStateInterface, action: PayloadAction<SortOption>) => {
            state.sort = action.payload;
            state.page = 1;
        },
        setViewMode: (state: CartStateInterface, action: PayloadAction<ViewMode>) => {
            state.viewMode = action.payload;
        },
        setPage: (state: CartStateInterface, action: PayloadAction<number>) => {
            state.page = action.payload;
        },
        setSelectedCategory: (state: CartStateInterface, action: PayloadAction<PresentationCategory | null>) => {
            state.selectedCategory = action.payload;
            state.page = 1;
        },
        setSearchTerm: (state: CartStateInterface, action: PayloadAction<string>) => {
            state.searchTerm = action.payload;
            state.page = 1;
        },
        setExactMatch: (state: CartStateInterface, action: PayloadAction<boolean>) => {
            state.exactMatch = action.payload;
            state.page = 1;
        },
        startLoadingPresentations: (state: CartStateInterface) => {
            state.presentationsLoading = true;
        },
        setPresentations: (state: CartStateInterface, action: PayloadAction<Presentation[]>) => {
            state.presentations = action.payload;
            state.presentationsLoading = false;
        },
        resetPresentations: (state: CartStateInterface) => {
            state.presentations = [];
            state.presentationsLoading = false;
        },
        startLoadingProducts: (state: CartStateInterface) => {
            state.productsLoading = true;
        },
        setProducts: (state: CartStateInterface, action: PayloadAction<Product[]>) => {
            state.products = action.payload;
            state.productsLoading = false;
        },
        resetProducts: (state: CartStateInterface) => {
            state.products = [];
            state.productsLoading = false;
        },
    }
});

export const {
  setProductSelected,
  setPresentationSelected,
  addToCartAction,
  addUnitAction,
  removeFromCart,
  cleanCart,
  setError,
  setSort,
  setViewMode,
  setPage,
  setSelectedCategory,
  setSearchTerm,
  setExactMatch,
  startLoadingPresentations,
  setPresentations,
  resetPresentations,
  startLoadingProducts,
  setProducts,
  resetProducts,
} = cartSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default cartSlice.reducer;