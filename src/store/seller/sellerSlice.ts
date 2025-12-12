
// # Slice: sellerSlice  

// ## Descripción 📦  
// Slice de Redux encargado de manejar el estado de **vendedores** y su interacción con productos y carrito.  
// Define el estado inicial, reducers y acciones para seleccionar productos, agregarlos al carrito y manejar errores.  

// ## Estado inicial 🔧  
// - `_id`: identificador único del vendedor (null por defecto).  
// - `name`: nombre del vendedor (string vacío).  
// - `cart`: lista de productos agregados al carrito (array vacío).  
// - `productSelected`: producto actualmente seleccionado (null).  
// - `description`: descripción del vendedor (string vacío).  
// - `created_at`: fecha de creación (string vacío).  
// - `updated_at`: fecha de última actualización (string vacío).  
// - `errorMessage`: mensaje de error (null).  

// ## Reducers 🎭  
// - **setProductSelected**:  
//   - Recibe un producto y lo asigna a `productSelected`.  
// - **addToCartAction**:  
//   - Recibe un producto y lo agrega al array `cart`.  
//   - Usa spread operator para mantener los productos previos y añadir el nuevo.  
// - **setError**:  
//   - Recibe un mensaje de error y lo guarda en `errorMessage`.  

// ## Acciones exportadas 🚀  
// - `setProductSelected`  
// - `addToCartAction`  
// - `setError`  

// ## Tipos 📑  
// - `RootState`: tipo derivado de `store.getState`.  
// - `AppDispatch`: tipo derivado de `store.dispatch`.  

// ## Notas técnicas 💽  
// - El slice se exporta como `sellerSlice.reducer` para integrarse en el store global.  
// - Modularidad: centraliza la lógica de vendedores y carrito en un único slice.  
// - Escalabilidad: se pueden añadir reducers para manejar operaciones como eliminar del carrito, actualizar cantidades o limpiar errores.  


import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { store } from '../store';
import type { SellerAddToCartSlicePayload, SellerError, SellerSetProductSlicePayload, SellerStateInterface } from '../../typings/seller/sellerTypes';


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