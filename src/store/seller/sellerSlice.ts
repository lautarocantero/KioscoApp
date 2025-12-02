import { createSlice } from '@reduxjs/toolkit';
import type { store } from '../store';


const initialState: SellerState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const sellerSlice = createSlice({
    name: 'seller',
    initialState,
    reducers: {

    }
});

// export const {} = sellerSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default sellerSlice.reducer;