import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import SellersListPage from "../pages/SellersList/SellersListPage";
import SellerEditPage from "../pages/SellerEdit/SellerEditPage";
import SellerDetailPage from "../pages/SellerDetail/SellerDetailPage";

const SellerRoutes = (): ReactNode => {
    return (
        <>
            <Route path="/sellers" element={<SellersListPage />} />
            <Route path="/seller/:seller_id" element={<SellerDetailPage />} />
            <Route path="/seller/:seller_id/seller-edit" element={<SellerEditPage />} />
        </>
    );
};

export default SellerRoutes;