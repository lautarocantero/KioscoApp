
// # Componente de Rutas: ShopRoutes  

// ## Descripción 📦  
// Define todas las rutas relacionadas con la sección **Tienda** y sus submódulos (Administradores, Vendedores, Estadísticas).  
// Cada ruta está asociada a un componente de página específico, permitiendo la navegación interna con `react-router-dom`.  

// ## Lógica 🔧  
// - Usa `Route` de `react-router-dom` para mapear paths a componentes.  
// - Agrupa las rutas en un fragmento (`<>...</>`), que luego puede ser integrado en un `Routes` global.  
// - Rutas definidas:  
//   - `/shop` → `ShopPage`  
//   - `/shop-administrators` → `ShopAdminPage`  
//   - `/shop-administrators-list` → `ShopAdminListPage`  
//   - `/shop-administrators-create` → `ShopAdminCreatePage`  
//   - `/shop-administrators-edit` → `ShopAdminEditPage`  
//   - `/shop-sellers` → `ShopSellersPage`  
//   - `/shop-sellers-list` → `ShopSellersListPage`  
//   - `/shop-sellers-create` → `ShopSellersCreatePage`  
//   - `/shop-sellers-edit` → `ShopSellersEditPage`  
//   - `/shop-stadistics` → `ShopStadisticsPage`  

// ## Notas técnicas 💽  
// - **Posible bug**: la importación de `ShopSellersListPage` apunta a `"./pages/ShopSellersListPage copy"`.  
//   - Debería corregirse a `"./pages/ShopSellersListPage"` para mantener consistencia y evitar errores de compilación.  
// - Este componente no envuelve las rutas en `<Routes>`.  
//   - Se espera que `ShopRoutes` sea utilizado dentro de un `Routes` global en la aplicación principal.  
// - Modularidad: centraliza todas las rutas de la sección tienda en un único archivo, facilitando mantenimiento y escalabilidad.  


import { Route } from "react-router-dom"
import ShopPage from "./pages/ShopPage";
import ShopSellersListPage from "./pages/ShopSellersListPage";
import ShopSellersCreatePage from "./pages/ShopSellersCreatePage";
import ShopSellersEditPage from "./pages/ShopSellersEditPage";
import ShopStadisticsPage from "./pages/ShopStadisticsPage";

const ShopRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/shop-sellers" element={<ShopSellersListPage />} />
            <Route path="/shop-sellers-create" element={<ShopSellersCreatePage />} />
            <Route path="/shop-sellers-edit" element={<ShopSellersEditPage />} />
            <Route path="/shop-stadistics" element={<ShopStadisticsPage />} />
        </>
    )
}

export default ShopRoutes;