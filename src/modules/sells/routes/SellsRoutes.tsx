
import { Route } from "react-router-dom";
import { DialogProvider } from "../context/Product/ProductDialogProvider";
import NewSellPage from "../pages/newSell/NewSellPage";
import SellDetailPage from "../pages/sellDetail/SellDetail";
import SellsListPage from "../pages/sellsList/SellsListPage";

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsListPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/sells-history/:_id" element={<SellDetailPage />} />
        </>
    )
}

export default SellsRoutes;