import { Route } from "react-router-dom";
import ProductsListPage         from "./pages/ProductsList/ProductsListPage";
import ProductCreatePage   from "./pages/ProductCreate/ProductCreatePage";
import ProductsEditPage     from "./pages/ProductEdit/ProductsEditPage";
import ProductDetailPage    from "./pages/ProductDetail/ProductDetailPage";

const ProductsRoutes = (): React.ReactNode => {
    return (
        <>
            {/* ── Productos ─────────────────────────────────────────────── */}
            <Route path="/products"                   element={<ProductsListPage />} />
            <Route path="/products-create"            element={<ProductCreatePage />} />
            <Route path="/product/:productId"         element={<ProductDetailPage />} />
            <Route path="/products/:productId/edit"   element={<ProductsEditPage />} />

        </>
    );
};

export default ProductsRoutes;
