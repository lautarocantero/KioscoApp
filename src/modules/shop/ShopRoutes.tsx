
import { Route } from "react-router-dom"
import ShopPage from "./pages/ShopPage";
import ShopAdminPage from "./pages/ShopAdminPage";
import ShopAdminListPage from "./pages/ShopAdminsListPage";
import ShopAdminCreatePage from "./pages/ShopAdminCreatePage";
import ShopAdminEditPage from "./pages/ShopAdminEditPage";
import ShopSellersPage from "./pages/ShopSellersPage";
import ShopSellersListPage from "./pages/ShopSellersListPage copy";
import ShopSellersCreatePage from "./pages/ShopSellersCreatePage";
import ShopSellersEditPage from "./pages/ShopSellersEditPage";
import ShopStadisticsPage from "./pages/ShopStadisticsPage";

const ShopRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop-administrators" element={<ShopAdminPage />} />
            <Route path="/shop-administrators-list" element={<ShopAdminListPage />} />
            <Route path="/shop-administrators-create" element={<ShopAdminCreatePage />} />
            <Route path="/shop-administrators-edit" element={<ShopAdminEditPage />} />
            <Route path="/shop-sellers" element={<ShopSellersPage />} />
            <Route path="/shop-sellers-list" element={<ShopSellersListPage />} />
            <Route path="/shop-sellers-create" element={<ShopSellersCreatePage />} />
            <Route path="/shop-sellers-edit" element={<ShopSellersEditPage />} />
            <Route path="/shop-stadistics" element={<ShopStadisticsPage />} />
        </>
    )
}

export default ShopRoutes;