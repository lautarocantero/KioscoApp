import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth/authSlice";
import productVariantSlice from "./productVariant/productVariantSlice";
import userSlice from "./user/userSlice";
import productSlice from "./product/productSlice";
import providerSlice from "./provider/providerSlice";
import sellSlice from "./sell/sellSlice";
import sellerSlice from "./seller/sellerSlice";


export const store = configureStore({
    reducer: {
        auth: authSlice,
        user: userSlice,
        product: productSlice,
        productVariant: productVariantSlice,
        provider:providerSlice,
        sell: sellSlice,
        seller: sellerSlice,
    },
})