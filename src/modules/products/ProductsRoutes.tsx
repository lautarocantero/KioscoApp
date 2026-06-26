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
import ProductsPage         from "./pages/Products/ProductsList/ProductsPage";
import ProductsCreatePage   from "./pages/Products/ProductCreate/ProductsCreatePage";
import ProductsEditPage     from "./pages/Products/ProductEdit/ProductsEditPage";
import ProductDetailPage    from "./pages/Products/ProductDetail/ProductDetailPage";
import CategoriesPage       from "./pages/Categories/CategoriesPage";
import CategoriesListPage   from "./pages/Categories/CategoriesListPage";
import CategoriesCreatePage from "./pages/Categories/CategoriesCreatePage";
import CategoriesEditPage   from "./pages/Categories/CategoriesEditPage";

const ProductsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* ── Productos ─────────────────────────────────────────────── */}
            <Route path="/products"                   element={<ProductsPage />} />
            <Route path="/products-create"            element={<ProductsCreatePage />} />
            <Route path="/product/:productId"         element={<ProductDetailPage />} />
            <Route path="/products/:productId/edit"   element={<ProductsEditPage />} />

            {/* ── Categorías ────────────────────────────────────────────── */}
            <Route path="/categories"        element={<CategoriesPage />} />
            <Route path="/categories-list"   element={<CategoriesListPage />} />
            <Route path="/categories-create" element={<CategoriesCreatePage />} />
            <Route path="/categories-edit"   element={<CategoriesEditPage />} />
        </>
    );
};

export default ProductsRoutes;
