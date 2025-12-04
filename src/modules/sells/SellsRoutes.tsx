import { Route } from "react-router-dom"
import SellsPage from "./pages/SellsPage"
import NewSellPage from "./pages/NewSell"
import QrEscaner from "./pages/QrEscaner"
import SellsHistoryPage from "./pages/SellsHistory"
import SellsHistoryFiltersPage from "./pages/SellsHistoryFilter"
import { DialogProvider } from "./pages/context/ProductDialogProvider"

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/qr-scan" element={<QrEscaner />} />
            <Route path="/sells-history" element={<SellsHistoryPage />} />
            <Route path="/sells-history-filters" element={<SellsHistoryFiltersPage />} />
        </>
    )
}

export default SellsRoutes;