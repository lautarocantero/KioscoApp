import { Route } from "react-router-dom"
import CartPage from "./pages/CartPage";



const CartRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/cart" element={<CartPage />} />
        </>
    )
}

export default CartRoutes;