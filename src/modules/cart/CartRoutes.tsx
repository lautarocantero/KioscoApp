
//─────────────────── Componente 🧩: CartRoutes ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Definición de rutas para el flujo del carrito de compras.  
// Renderiza la página principal del carrito dentro del sistema de enrutamiento. 

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa `react-router-dom` para la gestión de rutas.  

//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import OrderConfirmedPage from "./pages/OrderConfirmedPage";

const CartRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/cart" element={<CartPage />} />
            <Route path="/cart-order-confirmed" element={<OrderConfirmedPage />} />
        </>
    )
}

export default CartRoutes;