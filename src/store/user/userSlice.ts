import { createSlice } from "@reduxjs/toolkit";
import type { store } from "../store";

const initialState: UserState = {
    _id: null,
    name: '',
    description: '',
    createdAt: '',
    updatedAt: '',
    errorMessage: null,
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {

    }
});

// export const {} = userSlice.actions;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default userSlice.reducer;