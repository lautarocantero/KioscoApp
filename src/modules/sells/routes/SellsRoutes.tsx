
//─────────────────── Componente 🧩: SellsRoutes ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Definición de rutas para el flujo de las ventas.  
// Renderiza la página principal de ventas dentro del sistema de enrutamiento. 

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa `react-router-dom` para la gestión de rutas.  

//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom"
import NewSellPage from "../pages/sells/newSell/NewSellPage"
import SellsPage from "../pages/sells/newSell/SellsPage"
import { DialogProvider } from "../pages/context/ProductDialogProvider"
import SellsHistoryPage from "../pages/sells/sellsList/SellsHistory"
import SellDetailPage from "../pages/sells/sellDetail/SellDetail"

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/sells-history" element={<SellsHistoryPage />} />
            <Route path="/sells-history/:ticket_id" element={<SellDetailPage />} />
        </>
    )
}

export default SellsRoutes;