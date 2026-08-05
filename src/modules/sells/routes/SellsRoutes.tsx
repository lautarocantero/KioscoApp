
import { Route } from "react-router-dom";
import SellsListPage from "../pages/SellsList/SellsListPage";
import SellDetailPage from "../pages/SellDetail/SellDetailPage";
import SellEditPage from "../pages/SellEdit/SellEditPage";

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsListPage />} />
            <Route path="/sell/:sell_id/sell-edit" element={<SellEditPage />} />
            <Route path="/sell/:sell_id" element={<SellDetailPage />} />
        </>
    )
}

export default SellsRoutes;