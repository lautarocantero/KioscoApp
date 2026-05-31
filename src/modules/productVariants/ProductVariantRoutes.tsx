// # Componente: ProductVariantRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de presentaciones (variantes) de productos.

// ## Rutas 🛣️
// ┌──────────────────────────────────────────────────────────────────────────┐
// │ "/products/:productId/variants/new"          → ProductVariantCreatePage  │
// │ "/products/:productId/variants/:variant_id"  → ProductVariantDetailPage  │
// │ "/products/:product_id/variants"             → ProductVariantListPage    │
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

const ProductVariantRoutes = (): React.ReactNode => {
    return (
        <>
            {/* Ruta estática primero para evitar que :variant_id absorba "new" */}
            <Route path="/products/:productId/variants/new"          element={<ProductVariantCreatePage />} />
            <Route path="/products/:productId/variants/:variant_id/edit" element={<ProductVariantEditPage />} />
            <Route path="/products/:productId/variants/:variant_id"  element={<ProductVariantDetailPage />} />
            <Route path="/products/:product_id/variants"             element={<ProductVariantListPage />} />
        </>
    );
};

export default ProductVariantRoutes;
