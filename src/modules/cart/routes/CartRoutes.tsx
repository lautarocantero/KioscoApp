import { Route } from "react-router-dom";
import OrderConfirmedPage from "../pages/OrderConfirmed/OrderConfirmedPage";
import type { ReactNode } from "react";
import NewSellPage from "../pages/NewSell/NewSellPage";

const CartRoutes = (): ReactNode => {

    return (
        <>
            <Route path="/new-sell" element={<NewSellPage />} />
            <Route path="/cart-order-confirmed/:ticketNumber?" element={<OrderConfirmedPage />} />
        </>
    )
}

export default CartRoutes;