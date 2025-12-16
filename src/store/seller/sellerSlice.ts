//─────────────────── Slice 🍕: sellerSlice ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Slice de Redux encargado de manejar el estado de vendedores y su interacción con productos y carrito.
// Define estado inicial, reducers y acciones para selección de producto, carrito y errores.  

//──────────────────── Estado inicial 🛌 ─────────────────────//
// - _id: identificador único del vendedor (null).
// - name: nombre del vendedor.
// - cart: lista de productos en el carrito.
// - productSelected: producto actualmente seleccionado.
// - description: descripción del vendedor.
// - created_at: fecha de creación.
// - updated_at: fecha de última actualización.
// - errorMessage: mensaje de error.  

//──────────────────── Reducers 🧰 ─────────────────────//
// - setProductSelected: asigna producto a productSelected.
// - addToCartAction: agrega producto al carrito manteniendo los previos.
// - setError: guarda mensaje de error en errorMessage.  

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Exportado como sellerSlice.reducer para integrarse en el store global.
//-----------------------------------------------------------------------------//

import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SellerAddToCartSlicePayload, SellerError, SellerSetProductSlicePayload, SellerStateInterface } from '../../typings/seller/sellerTypes';
import type { store } from '../store';

const initialState: SellerStateInterface = {
    _id: null,
    name: '',
    cart: [],
    productSelected: null,
    description: '',
    created_at: '',
    updated_at: '',
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
