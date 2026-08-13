import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { Seller } from '../../typings/seller/sellerTypes';

// 🆕 Tipos locales — mové esto a typings/seller/sellerTypes.ts si preferís centralizarlo.
export interface SellerAdminStateInterface {
    sellers: Seller[];
    sellersLoading: boolean;
    selectedSeller: Seller | null;
    errorMessage: string | null;
}

export interface SetSellersPayload { sellers: Seller[] }
export interface SetSelectedSellerPayload { seller: Seller | null }
export interface SellerAdminError { errorMessage: string | null }
export interface AddSellerToListPayload { seller: Seller }
export interface UpdateSellerInListPayload { seller: Seller }
export interface RemoveSellerFromListPayload { _id: string }

const initialState: SellerAdminStateInterface = {
    sellers: [],
    sellersLoading: false,
    selectedSeller: null,
    errorMessage: null,
};

export const sellerSlice = createSlice({
    name: 'sellers', // distinto del 'seller' de cartSlice para no chocar en el store
    initialState,
    reducers: {
        startLoadingSellers: (state: SellerAdminStateInterface) => {
            state.sellersLoading = true;
        },
        setSellers: (state: SellerAdminStateInterface, action: PayloadAction<SetSellersPayload>) => {
            state.sellers = action.payload.sellers;
            state.sellersLoading = false;
        },
        resetSellers: (state: SellerAdminStateInterface) => {
            state.sellers = [];
            state.sellersLoading = false;
        },
        setSelectedSeller: (state: SellerAdminStateInterface, action: PayloadAction<SetSelectedSellerPayload>) => {
            state.selectedSeller = action.payload.seller;
        },
        clearSelectedSeller: (state: SellerAdminStateInterface) => {
            state.selectedSeller = null;
        },
        addSellerToList: (state: SellerAdminStateInterface, action: PayloadAction<AddSellerToListPayload>) => {
            state.sellers = [...state.sellers, action.payload.seller];
        },
        updateSellerInList: (state: SellerAdminStateInterface, action: PayloadAction<UpdateSellerInListPayload>) => {
            const { seller } = action.payload;
            const index = state.sellers.findIndex((item) => item._id === seller._id);
            if (index === -1) return;
            state.sellers[index] = seller;

            if (state.selectedSeller?._id === seller._id) {
                state.selectedSeller = seller;
            }
        },
        removeSellerFromList: (state: SellerAdminStateInterface, action: PayloadAction<RemoveSellerFromListPayload>) => {
            const { _id } = action.payload;
            state.sellers = state.sellers.filter((item) => item._id !== _id);

            if (state.selectedSeller?._id === _id) {
                state.selectedSeller = null;
            }
        },
        setSellerError: (state: SellerAdminStateInterface, action: PayloadAction<SellerAdminError>) => {
            state.errorMessage = action.payload.errorMessage;
        },
    },
});

export const {
    startLoadingSellers,
    setSellers,
    resetSellers,
    setSelectedSeller,
    clearSelectedSeller,
    addSellerToList,
    updateSellerInList,
    removeSellerFromList,
    setSellerError,
} = sellerSlice.actions;

export default sellerSlice.reducer;