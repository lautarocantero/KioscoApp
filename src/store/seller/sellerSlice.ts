import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type {
    SellerSliceState,
    SetSellersPayload,
    SetSelectedSellerPayload,
    SellerSliceError,
    AddSellerToListPayload,
    UpdateSellerInListPayload,
    RemoveSellerFromListPayload,
} from '../../typings/seller/sellerTypes';
import type { store } from '../store';

const initialState: SellerSliceState = {
    sellers: [],
    isLoading: false,
    selectedSeller: null,
    errorMessage: null,
};

export const sellerSlice = createSlice({
    name: 'sellers', // distinto del 'seller' de cartSlice para no chocar en el store
    initialState,
    reducers: {
        startLoadingSellers: (state: SellerSliceState) => {
            state.isLoading = true;
        },
        stopLoadingSellers: (state: SellerSliceState) => {
            state.isLoading = false;
        },
        setSellers: (state: SellerSliceState, action: PayloadAction<SetSellersPayload>) => {
            state.sellers = action.payload.sellers;
            state.isLoading = false;
        },
        resetSellers: (state: SellerSliceState) => {
            state.sellers = [];
            state.isLoading = false;
        },
        setSelectedSeller: (state: SellerSliceState, action: PayloadAction<SetSelectedSellerPayload>) => {
            state.selectedSeller = action.payload.seller;
        },
        clearSelectedSeller: (state: SellerSliceState) => {
            state.selectedSeller = null;
        },
        addSellerToList: (state: SellerSliceState, action: PayloadAction<AddSellerToListPayload>) => {
            state.sellers = [...state.sellers, action.payload.seller];
        },
        updateSellerInList: (state: SellerSliceState, action: PayloadAction<UpdateSellerInListPayload>) => {
            const { seller } = action.payload;
            const index = state.sellers.findIndex((item) => item._id === seller._id);
            if (index === -1) return;
            state.sellers[index] = seller;

            if (state.selectedSeller?._id === seller._id) {
                state.selectedSeller = seller;
            }
        },
        removeSellerFromList: (state: SellerSliceState, action: PayloadAction<RemoveSellerFromListPayload>) => {
            const { _id } = action.payload;
            state.sellers = state.sellers.filter((item) => item._id !== _id);

            if (state.selectedSeller?._id === _id) {
                state.selectedSeller = null;
            }
        },
        setSellerError: (state: SellerSliceState, action: PayloadAction<SellerSliceError>) => {
            state.errorMessage = action.payload.errorMessage;
        },
    },
});

export const {
    startLoadingSellers,
    stopLoadingSellers,
    setSellers,
    resetSellers,
    setSelectedSeller,
    clearSelectedSeller,
    addSellerToList,
    updateSellerInList,
    removeSellerFromList,
    setSellerError,
} = sellerSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;


export default sellerSlice.reducer;