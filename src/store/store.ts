import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import userSlice from "./user/userSlice";
import productSlice from "./product/productSlice";
import providerSlice from "./provider/providerSlice";
import sellSlice from "./sell/sellSlice";
import sellerSlice from "./seller/sellerSlice";
import sellerPersonSlice from "./seller/sellerPersonSlice";
import presentationSlice from "./presentation/presentationSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        product: productSlice,
        presentation: presentationSlice,
        provider:providerSlice,
        sell: sellSlice,
        seller: sellerSlice,
        sellerPerson: sellerPersonSlice, // to do aca se repiten porque por alguna razon en seller puse todo lo de sells,
        // debe de ser sell para las ventas y seller para los vendedores, arreglar luego. sellerPerson tiene lo de los vendedores al dia
    },
})