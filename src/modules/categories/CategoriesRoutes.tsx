// # Componente: ProductsRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de productos y categorías.
// Las rutas de presentaciones (variantes) viven en PresentationRoutes.

// ## Rutas 🛣️
// ┌────────────────────────────────────────────────────────────┐
// │ "/products"                      → ProductsPage            │
// │ "/products-create"               → ProductsCreatePage      │
// │ "/product/:productId"            → ProductDetailPage       │
// │ "/products/:productId/edit"      → ProductsEditPage        │
// │ "/categories"                    → CategoriesPage          │
// │ "/categories-list"               → CategoriesListPage      │
// │ "/categories-create"             → CategoriesCreatePage    │
// │ "/categories-edit"               → CategoriesEditPage      │
// └────────────────────────────────────────────────────────────┘

// ## Notas técnicas 💽
// - Las rutas de variantes fueron movidas a PresentationRoutes
//   (modules/Presentations/PresentationRoutes.tsx).
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import CategoriesCreatePage from "./pages/CategoriesCreatePage";
import CategoriesEditPage from "./pages/CategoriesEditPage";

const ProductsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* ── Categorías ────────────────────────────────────────────── */}
            <Route path="/categories"        element={<CategoriesPage />} />
            <Route path="/categories-list"   element={<CategoriesListPage />} />
            <Route path="/categories-create" element={<CategoriesCreatePage />} />
            <Route path="/categories-edit"   element={<CategoriesEditPage />} />
        </>
    );
};

export default ProductsRoutes;
