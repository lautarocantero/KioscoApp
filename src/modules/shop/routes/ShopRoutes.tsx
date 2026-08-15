import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import ShopPage from "../pages/Shop/ShopPage";

const ShopRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/shop" element={<ShopPage />} />
        </>
    );
};

export default ShopRoutes;
