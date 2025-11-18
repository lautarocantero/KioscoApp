import { Route } from "react-router-dom"
import ProductsPage from "./pages/ProductsPage"
import ProductsListPage from "./pages/ProductsListPage"
import ProductsCreatePage from "./pages/ProductsCreatePage"
import ProductsEditPage from "./pages/ProductsEditPage"
import CategoriesPage from "./pages/CategoriesPage"
import CategoriesListPage from "./pages/CategoriesListPage"
import CategoriesCreatePage from "./pages/CategoriesCreatePage"
import CategoriesEditPage from "./pages/CategoriesEditPage"



const ProductsRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/products-list" element={<ProductsListPage />} />
            <Route path="/products-create" element={<ProductsCreatePage />} />
            <Route path="/products-edit" element={<ProductsEditPage />} />
            <Route path="/categories" element={<CategoriesPage />} />
            <Route path="/categories-list" element={<CategoriesListPage />} />
            <Route path="/categories-create" element={<CategoriesCreatePage />} />
            <Route path="/categories-edit" element={<CategoriesEditPage />} />
        </>
    )
}

export default ProductsRoutes;