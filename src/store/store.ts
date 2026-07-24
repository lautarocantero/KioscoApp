import { combineReducers, configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import productSlice from "./product/productSlice";
import providerSlice from "./provider/providerSlice";
import sellSlice from "./sell/sellSlice";
import sellerSlice from "./seller/sellerSlice";
import sellerPersonSlice from "./seller/sellerPersonSlice";
import presentationSlice from "./presentation/presentationSlice";

//─── 🔎 Storage engine manual 🔎 ───
// redux-persist/lib/storage tiene problemas de interop con el pre-bundling
// de Vite (el default export no resuelve al engine real). Se define acá
// un wrapper mínimo sobre localStorage que cumple la interfaz esperada.
const localStorageEngine = {
    getItem: (key: string): Promise<string | null> => Promise.resolve(localStorage.getItem(key)),
    setItem: (key: string, value: string): Promise<void> => {
        localStorage.setItem(key, value);
        return Promise.resolve();
    },
    removeItem: (key: string): Promise<void> => {
        localStorage.removeItem(key);
        return Promise.resolve();
    },
};

//─── 🔎 Persistencia: solo el carrito sobrevive a un reload 🔎 ───
const sellerPersistConfig = {
    key: 'seller',
    storage: localStorageEngine,
    whitelist: ['cart'],
};

const persistedSellerReducer = persistReducer(sellerPersistConfig, sellerSlice);

const rootReducer = combineReducers({
    auth: authSlice,
    user: userSlice,
    product: productSlice,
    presentation: presentationSlice,
    provider: providerSlice,
    sell: sellSlice,
    seller: persistedSellerReducer,
    sellerPerson: sellerPersonSlice, // to do aca se repiten porque por alguna razon en seller puse todo lo de sells,
    // debe de ser sell para las ventas y seller para los vendedores, arreglar luego. sellerPerson tiene lo de los vendedores al dia
});

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
});

export const persistor = persistStore(store);