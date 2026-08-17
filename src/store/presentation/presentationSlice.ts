// store/presentation/presentationSlice.ts
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { store } from "../store";
import type { Presentation, PresentationState, PresentationStateError } from "../../typings/presentation/presentationTypes";

const initialState: PresentationState = {
    presentations: [],
    selectedPresentation: null,
    isLoading: false,
    errorMessage: null,
    allPresentations: [],
    isLoadingAllPresentations: false,
    allPresentationsError: null,
};

export const presentationSlice = createSlice({
    name: "presentation",
    initialState,
    reducers: {
        startLoadingPresentations: (state) => {
            state.isLoading = true;
            state.errorMessage = null;
        },
        setPresentations: (state, action: PayloadAction<Presentation[]>) => {
            state.presentations = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        setSelectedPresentation: (state, action: PayloadAction<Presentation | null>) => {
            state.selectedPresentation = action.payload;
            state.isLoading = false;
            state.errorMessage = null;
        },
        removePresentationFromList: (state, action: PayloadAction<string>) => {
            state.presentations = state.presentations.filter((p) => p._id !== action.payload);
        },
        // Reposición de stock desde la tabla: pisa solo `stock` de la fila afectada,
        // sin depender de `selectedPresentation` (la tabla no lo tiene cargado).
        patchPresentationStock: (state, action: PayloadAction<{ _id: string; stock: number }>) => {
            const target = state.presentations.find((p) => p._id === action.payload._id);
            if (target) target.stock = action.payload.stock;
        },
        setError: (state, action: PayloadAction<PresentationStateError>) => {
            state.errorMessage = action.payload.errorMessage;
            state.isLoading = false;
        },
        clearError: (state) => {
            state.errorMessage = null;
        },
        resetPresentations: (state) => {
            state.presentations = [];
            state.selectedPresentation = null;
            state.isLoading = false;
            state.errorMessage = null;
        },
        checkingAllPresentations: (state) => {
            state.isLoadingAllPresentations = true;
            state.allPresentationsError = null;
        },
        setAllPresentations: (state, action: PayloadAction<Presentation[]>) => {
            state.allPresentations = action.payload;
            state.isLoadingAllPresentations = false;
            state.allPresentationsError = null;
        },
        setAllPresentationsError: (state, action: PayloadAction<string>) => {
            state.isLoadingAllPresentations = false;
            state.allPresentationsError = action.payload;
        },
    },
});

export const {
    startLoadingPresentations,
    setPresentations,
    setSelectedPresentation,
    removePresentationFromList,
    patchPresentationStock,
    setError,
    clearError,
    resetPresentations,
    checkingAllPresentations,
    setAllPresentations,
    setAllPresentationsError,
} = presentationSlice.actions;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default presentationSlice.reducer;