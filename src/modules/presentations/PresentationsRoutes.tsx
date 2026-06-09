// # Componente: ProductVariantRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de presentaciones (variantes) de productos.

// ## Rutas 🛣️
// ┌──────────────────────────────────────────────────────────────────────────┐
// │ "/products/:productId/presentations/new"          → ProductVariantCreatePage  │
// │ "/products/:productId/presentations/:variant_id"  → ProductVariantDetailPage  │
// │ "/products/:product_id/presentations"             → ProductVariantListPage    │
// └──────────────────────────────────────────────────────────────────────────┘

// ## Notas técnicas 💽
// - Las rutas con segmentos estáticos (/new) se definen ANTES de las dinámicas
//   (/:variant_id) para evitar conflictos de matching en react-router-dom v6.
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import ProductVariantCreatePage from "./pages/ProductVariantCreatePage";
import ProductVariantDetailPage from "./pages/ProductVariantDetailPage";
import ProductVariantListPage   from "./pages/ProductVariantListPage";
import ProductVariantEditPage from "./pages/ProductVariantEditPage";

const PresentationsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* Estáticos primero */}
            <Route path="/products/:product_id/presentations/new"                      element={<ProductVariantCreatePage />} />
            {/* Dinámicos después */}
            <Route path="/products/:product_id/presentations/:presentation_id/edit"    element={<ProductVariantEditPage />} />
            <Route path="/products/:product_id/presentations/:presentation_id"         element={<ProductVariantDetailPage />} />
            <Route path="/products/:product_id/presentations"                          element={<ProductVariantListPage />} />
        </>
    );
};

export default PresentationsRoutes;
