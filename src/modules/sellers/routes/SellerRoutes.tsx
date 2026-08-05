
import { Route } from "react-router-dom";
import { DialogProvider } from "../../sellers/context/Product/ProductDialogProvider";
import NewSellPage from "../pages/NewSell/NewSellPage";

const SellerRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
        </>
    )
}

export default SellerRoutes;