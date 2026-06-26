// # Componente: ProductVariantRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de presentaciones (variantes) de productos.

// ## Rutas 🛣️
// ┌──────────────────────────────────────────────────────────────────────────┐
// │ "/products/:productId/presentations/new"          → PresentationCreatePage  │
// │ "/products/:productId/presentations/:variant_id"  → PresentationDetailPage  │
// │ "/products/:product_id/presentations"             → PresentationListPage    │
// └──────────────────────────────────────────────────────────────────────────┘

// ## Notas técnicas 💽
// - Las rutas con segmentos estáticos (/new) se definen ANTES de las dinámicas
//   (/:variant_id) para evitar conflictos de matching en react-router-dom v6.
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import PresentationCreatePage from "./pages/PresentationCreate/PresentationCreatePage";
import PresentationDetailPage from "./pages/PresentationDetail/PresentationDetailPage";
import PresentationListPage   from "./pages/PresentationList/PresentationListPage";
import PresentationEditPage from "./pages/PresentationEdit/PresentationEditPage";

const PresentationsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* Estáticos primero */}
            <Route path="/products/:product_id/presentations/new"                      element={<PresentationCreatePage />} />
            {/* Dinámicos después */}
            <Route path="/products/:product_id/presentations/:presentation_id/edit"    element={<PresentationEditPage />} />
            <Route path="/products/:product_id/presentations/:presentation_id"         element={<PresentationDetailPage />} />
            <Route path="/products/:product_id/presentations"                          element={<PresentationListPage />} />
        </>
    );
};

export default PresentationsRoutes;
