import { Route } from "react-router-dom";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";
import type { ReactNode } from "react";

const CartRoutes = (): ReactNode => {

    return (
        <>
            <Route path="/cart-order-confirmed?/:ticketNumber" element={<OrderConfirmedPage />} />
        </>
    )
}

export default CartRoutes;