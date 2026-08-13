import { Route } from "react-router-dom";
import SellersListPage from "../pages/SellersListPage";
import ShopSellersEditPage from "../pages/SellersEditPage";
import ShopSellersCreatePage from "../pages/SellersCreatePage";
import type { ReactNode } from "react";


const CartRoutes = (): ReactNode => {

    return (
        <>
            <Route path="/sellers" element={<SellersListPage />} />
            <Route path="/sellers-create" element={<ShopSellersCreatePage />} />
            <Route path="/sellers-edit" element={<ShopSellersEditPage />} />
        </>
    )
}

export default CartRoutes;