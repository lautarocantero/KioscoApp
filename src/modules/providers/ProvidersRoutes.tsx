
// # Componente: ProvidersRoutes  

// ## Descripción 📦
// Definición de rutas para la gestión de proveedores.  
// Renderiza las páginas principales de listado, creación y edición dentro del sistema de enrutamiento.  

// ## Rutas 🛣️
// ┌───────────────────────────────┐
// │ "/providers"       → ProvidersPage       │
// │ "/providers-list"  → ProvidersListPage   │
// │ "/providers-create"→ ProvidersCreatePage │
// │ "/providers-edit"  → ProvidersEditPage   │
// └───────────────────────────────┘  

// ## Funciones 🔧
// - `ProvidersRoutes`: componente principal que devuelve las rutas de proveedores.  
//   - Cada `Route` está asociado a una página específica del módulo de proveedores.  

// ## Notas técnicas 💽
// - Usa `react-router-dom` para la gestión de rutas.  
// - Mantiene modularidad separando vistas de proveedores.  
// - Facilita la navegación entre listado, creación y edición de entidades.  
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom"
import ProvidersPage from "./pages/ProvidersPage"
import ProvidersListPage from "./pages/ProvidersListPage"
import ProvidersCreatePage from "./pages/ProvidersCreatePage"
import ProvidersEditPage from "./pages/ProvidersEditPage"



const ProvidersRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/providers" element={<ProvidersPage />} />
            <Route path="/providers-list" element={<ProvidersListPage />} />
            <Route path="/providers-create" element={<ProvidersCreatePage />} />
            <Route path="/providers-edit" element={<ProvidersEditPage />} />
        </>
    )
}

export default ProvidersRoutes;