import { Route } from "react-router-dom"
import ShopPage from "../pages/ShopPage";
import ShopSellersListPage from "../pages/sellers/ShopSellersListPage";
import ShopSellersCreatePage from "../pages/sellers/ShopSellersCreatePage";
import ShopSellersEditPage from "../pages/sellers/ShopSellersEditPage";
import ShopStadisticsPage from "../pages/stadistics/ShopStadisticsPage";
import type { ReactNode } from "react";


const ShopRoutes = (): ReactNode => {

    return (
        <>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop-sellers" element={<ShopSellersListPage />} />
            <Route path="/shop-sellers-create" element={<ShopSellersCreatePage />} />
            <Route path="/shop-sellers-edit" element={<ShopSellersEditPage />} />
            <Route path="/shop-stadistics" element={<ShopStadisticsPage />} />
        </>
    )
}

export default ShopRoutes;