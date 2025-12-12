
// # Rutas: SellsRoutes  

// ## Descripción 📦  
// Define el conjunto de rutas para el módulo de ventas dentro de la aplicación.  
// Cada ruta apunta a una página específica del flujo de ventas: inicio, nueva venta, escaneo QR, historial y filtros.  

// ## Lógica 🔧  
// - `/sells`: renderiza `SellsPage`, menú principal de ventas.  
// - `/new-sell`: renderiza `NewSellPage` envuelto en `DialogProvider` para manejar el contexto del diálogo de producto.  
// - `/qr-scan`: renderiza `QrEscaner`, vista para escaneo de códigos QR.  
// - `/sells-history`: renderiza `SellsHistoryPage`, historial de ventas.  
// - `/sells-history-filters`: renderiza `SellsHistoryFiltersPage`, filtros aplicables al historial de ventas.  

// ## Notas técnicas 💽  
// - Usa `Route` de `react-router-dom` para definir las rutas.  
// - `DialogProvider` se aplica únicamente en la ruta `/new-sell` para habilitar el contexto del diálogo de producto.  
// - Modularidad: cada página está separada en su propio archivo dentro de `pages`.  
// - Se integra en el enrutador principal de la aplicación como bloque de rutas del módulo de ventas.  


import { Route } from "react-router-dom"
import SellsPage from "./pages/SellsPage"
import NewSellPage from "./pages/NewSell"
import QrEscaner from "./pages/QrEscaner"
import SellsHistoryPage from "./pages/SellsHistory"
import SellsHistoryFiltersPage from "./pages/SellsHistoryFilter"
import { DialogProvider } from "./pages/context/ProductDialogProvider"

const SellsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/sells" element={<SellsPage />} />
            <Route path="/new-sell" element={<DialogProvider><NewSellPage /></DialogProvider>} />
            <Route path="/qr-scan" element={<QrEscaner />} />
            <Route path="/sells-history" element={<SellsHistoryPage />} />
            <Route path="/sells-history-filters" element={<SellsHistoryFiltersPage />} />
        </>
    )
}

export default SellsRoutes;