import { Route } from "react-router-dom";
import type { ReactNode } from "react";
import NewSellPage from "../pages/NewSell/NewSellPage";

const CartRoutes = (): ReactNode => {

    return (
        <>
            <Route path="/new-sell" element={<NewSellPage />} />
        </>
    )
}

export default CartRoutes;