import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import { ACTIVE_KIOSCO_STORAGE_KEY } from "../../config/constants";

interface KioscoSliceState {
    myKioscos: KioscoWithStats[];
    activeKioscoId: string | null;
    loading: boolean;
    errorMessage: string | null;
}

// Hidratado sincrónicamente desde localStorage (mismo patrón que
// CURRENCY_STORAGE_KEY/FONT_SIZE_STORAGE_KEY): así una recarga de página
// no muestra el selector de kiosco de nuevo si ya había uno activo.
const initialState: KioscoSliceState = {
    myKioscos: [],
    activeKioscoId: localStorage.getItem(ACTIVE_KIOSCO_STORAGE_KEY),
    loading: false,
    errorMessage: null,
};

export const kioscoSlice = createSlice({
    name: "kiosco",
    initialState,
    reducers: {
        startLoadingKioscos: (state) => {
            state.loading = true;
            state.errorMessage = null;
        },
        setMyKioscos: (state, action: PayloadAction<{ kioscos: KioscoWithStats[] }>) => {
            state.myKioscos = action.payload.kioscos;
            state.loading = false;
        },
        setKioscoError: (state, action: PayloadAction<{ errorMessage: string }>) => {
            state.errorMessage = action.payload.errorMessage;
            state.loading = false;
        },
        clearKioscoError: (state) => {
            state.errorMessage = null;
        },
        setActiveKioscoId: (state, action: PayloadAction<{ kioscoId: string | null }>) => {
            state.activeKioscoId = action.payload.kioscoId;
        },
        resetKioscoState: () => initialState,
    },
});

export const {
    startLoadingKioscos,
    setMyKioscos,
    setKioscoError,
    clearKioscoError,
    setActiveKioscoId,
    resetKioscoState,
} = kioscoSlice.actions;

export default kioscoSlice.reducer;
