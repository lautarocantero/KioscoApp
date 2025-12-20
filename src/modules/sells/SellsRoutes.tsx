
//─────────────────── Componente 🧩: SellsRoutes ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Definición de rutas para el flujo de las ventas.  
// Renderiza la página principal de ventas dentro del sistema de enrutamiento. 

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa `react-router-dom` para la gestión de rutas.  

//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom"
import NewSellPage from "./pages/NewSellPage"
import BarCodeEscaner from "./pages/BarCodeEscaner"
import SellsHistoryPage from "./pages/SellsHistory"
import SellsHistoryFiltersPage from "./pages/SellsHistoryFilter"
import SellsPage from "./pages/SellsPage"
import { DialogProvider } from "./pages/context/ProductDialogProvider"

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/qr-scan" element={<BarCodeEscaner />} />
            <Route path="/sells-history" element={<SellsHistoryPage />} />
            <Route path="/sells-history-filters" element={<SellsHistoryFiltersPage />} />
        </>
    )
}

export default SellsRoutes;