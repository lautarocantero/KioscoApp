// # Componente: CategoriesRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de categorías.
// Las rutas de productos viven en modules/products/routes/ProductsRoutes,
// y las de presentaciones (variantes) en PresentationRoutes.

// ## Rutas 🛣️
// ┌────────────────────────────────────────────────────────────┐
// │ "/categories"                    → CategoriesPage          │
// │ "/categories-list"               → CategoriesListPage      │
// │ "/categories-create"             → CategoriesCreatePage    │
// │ "/categories-edit"               → CategoriesEditPage      │
// └────────────────────────────────────────────────────────────┘

// ## Notas técnicas 💽
// - Este componente todavía no está montado en src/router/AppRouter.tsx,
//   por lo que las rutas "/categories*" no son alcanzables desde la app
//   todavía. Las páginas de creación/edición/listado son placeholders
//   pendientes de implementación (ver docs correspondientes).
//-----------------------------------------------------------------------------//

import { Route } from "react-router-dom";
import CategoriesPage from "./pages/CategoriesPage";
import CategoriesListPage from "./pages/CategoriesListPage";
import CategoriesCreatePage from "./pages/CategoriesCreatePage";
import CategoriesEditPage from "./pages/CategoriesEditPage";

const CategoriesRoutes = (): React.ReactNode => {
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

export default CategoriesRoutes;
