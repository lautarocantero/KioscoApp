
import { Route } from "react-router-dom";
import { DialogProvider } from "../context/Product/ProductDialogProvider";
import NewSellPage from "../pages/NewSell/NewSellPage";
import SellsListPage from "../pages/SellsList/SellsListPage";
import SellDetailPage from "../pages/SellDetail/SellDetailPage";
import SellEditPage from "../pages/SellEdit/SellEditPage";

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsListPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/sell/:sell_id/sell-edit" element={<SellEditPage />} />
            <Route path="/sell/:sell_id" element={<SellDetailPage />} />
        </>
    )
}

export default SellsRoutes;