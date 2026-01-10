
//─────────────────── Componente 🧩: SellsRoutes ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Definición de rutas para el flujo de las ventas.  
// Renderiza la página principal de ventas dentro del sistema de enrutamiento. 

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa `react-router-dom` para la gestión de rutas.  

//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import { DialogProvider } from "../context/Product/ProductDialogProvider";
import NewSellPage from "../pages/newSell/NewSellPage";
import SellsPage from "../pages/newSell/SellsPage";
import SellDetailPage from "../pages/sellDetail/SellDetail";
import SellsHistoryPage from "../pages/sellsList/SellsHistory";

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