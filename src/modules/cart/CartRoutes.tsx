// # Componente: CartRoutes  

// ## Descripción 📦
// Definición de rutas para el flujo del carrito de compras.  
// Renderiza la página principal del carrito dentro del sistema de enrutamiento.  

// ## Funciones 🔧
// - `CartRoutes`: componente principal que devuelve las rutas del carrito.  
//   - `Route "/cart"`: renderiza `CartPage`.  

// ## Notas técnicas 💽
// - Usa `react-router-dom` para la gestión de rutas.  
// - Mantiene la modularidad separando la lógica de rutas del componente `CartPage`.  
//-----------------------------------------------------------------------------//


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