// # Componente: ProductsRoutes

// ## Descripción 📦
// Definición de rutas para la gestión de productos y categorías.
// Las rutas de presentaciones (variantes) viven en PresentationRoutes.

// ## Rutas 🛣️
// ┌────────────────────────────────────────────────────────────┐
// │ "/products"                      → ProductsListPage            │
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
import ProductsListPage         from "./pages/ProductsList/ProductsListPage";
import ProductsCreatePage   from "./pages/ProductCreate/ProductsCreatePage";
import ProductsEditPage     from "./pages/ProductEdit/ProductsEditPage";
import ProductDetailPage    from "./pages/ProductDetail/ProductDetailPage";

const ProductsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* ── Productos ─────────────────────────────────────────────── */}
            <Route path="/products"                   element={<ProductsListPage />} />
            <Route path="/products-create"            element={<ProductsCreatePage />} />
            <Route path="/product/:productId"         element={<ProductDetailPage />} />
            <Route path="/products/:productId/edit"   element={<ProductsEditPage />} />

        </>
    );
};

export default ProductsRoutes;
