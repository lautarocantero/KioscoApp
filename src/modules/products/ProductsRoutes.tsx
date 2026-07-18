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
            <Route path="/product-create"            element={<ProductCreatePage />} />
            <Route path="/product/:product_id"         element={<ProductDetailPage />} />
            <Route path="/product/:product_id/product-edit"   element={<ProductsEditPage />} />

        </>
    );
};

export default ProductsRoutes;
