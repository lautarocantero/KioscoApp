import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import ShopPage from "../pages/Shop/ShopPage";
import ShopStadisticsPage from "../../stadistics/ShopStadisticsPage";

const ShopRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop/stadistics" element={<ShopStadisticsPage />} />
        </>
    );
};

export default ShopRoutes;
