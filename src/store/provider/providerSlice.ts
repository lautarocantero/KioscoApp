import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Provider, ProviderState, ProviderStateError, ProviderStats } from "../../typings/provider/providerTypes";

const initialState: ProviderState = {
    providers:             [],
    currentProvider:       null,
    isLoading:             false,
    errorMessage:          null,
    isLoadingCurrent:      false,
    currentProviderError:  null,
    stats:                 null,
    isLoadingStats:        false,
    statsError:            null,
};

export const providerSlice = createSlice({
    name: "provider",
    initialState,
    reducers: {

        setProviders: (state: ProviderState, action: PayloadAction<Provider[]>) => {
            state.providers    = action.payload;
            state.isLoading    = false;
            state.errorMessage = null;
        },

        setCurrentProvider: (state: ProviderState, action: PayloadAction<Provider>) => {
            state.currentProvider      = action.payload;
            state.isLoadingCurrent     = false;
            state.currentProviderError = null;
        },

        clearCurrentProvider: (state: ProviderState) => {
            state.currentProvider = null;
        },

        setError: (state: ProviderState, action: PayloadAction<ProviderStateError>) => {
            state.errorMessage = action.payload.errorMessage;
            state.isLoading    = false;
        },

        checkingProviders: (state: ProviderState) => {
            state.providers    = [];
            state.isLoading    = true;
            state.errorMessage = null;
        },

        checkingCurrentProvider: (state: ProviderState) => {
            state.isLoadingCurrent     = true;
            state.currentProviderError = null;
        },

        setCurrentProviderError: (state: ProviderState, action: PayloadAction<string>) => {
            state.isLoadingCurrent     = false;
            state.currentProviderError = action.payload;
        },

        // Saca un proveedor de la lista sin necesidad de refetch.
        removeProvider: (state: ProviderState, action: PayloadAction<string>) => {
            state.providers = state.providers.filter((p) => p._id !== action.payload);
        },

        checkingStats: (state: ProviderState) => {
            state.isLoadingStats = true;
            state.statsError     = null;
        },

        setStats: (state: ProviderState, action: PayloadAction<ProviderStats>) => {
            state.stats           = action.payload;
            state.isLoadingStats  = false;
        },

        setStatsError: (state: ProviderState, action: PayloadAction<string>) => {
            state.statsError      = action.payload;
            state.isLoadingStats  = false;
        },

        resetProviders: (state: ProviderState) => {
            state.providers    = [];
            state.errorMessage = null;
        },
    },
});

export const {
    setProviders,
    setCurrentProvider,
    clearCurrentProvider,
    setError,
    checkingProviders,
    checkingCurrentProvider,
    setCurrentProviderError,
    removeProvider,
    checkingStats,
    setStats,
    setStatsError,
    resetProviders,
} = providerSlice.actions;

export type RootState   = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default providerSlice.reducer;
