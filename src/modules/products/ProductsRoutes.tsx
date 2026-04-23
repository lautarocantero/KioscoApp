
// # Componente: ProductsRoutes  

// ## Descripción 📦
// Definición de rutas para la gestión de productos y categorías.  
// Renderiza las páginas principales de listado, creación y edición dentro del sistema de enrutamiento.  

// ## Rutas 🛣️
// ┌───────────────────────────────┐
// │ "/products"        → ProductsPage        │
// │ "/products-list"   → ProductsListPage    │
// │ "/products-create" → ProductsCreatePage  │
// │ "/products-edit"   → ProductsEditPage    │
// │ "/categories"      → CategoriesPage      │
// │ "/categories-list" → CategoriesListPage  │
// │ "/categories-create" → CategoriesCreatePage │
// │ "/categories-edit" → CategoriesEditPage  │
// └───────────────────────────────┘  

// ## Funciones 🔧
// - `ProductsRoutes`: componente principal que devuelve las rutas de productos y categorías.  
//   - Cada `Route` está asociado a una página específica del módulo de inventario.  

// ## Notas técnicas 💽
// - Usa `react-router-dom` para la gestión de rutas.  
// - Mantiene modularidad separando vistas de productos y categorías.  
// - Facilita la navegación entre listado, creación y edición de entidades.  
//-----------------------------------------------------------------------------//


import { Route } from "react-router-dom"
import ProductsPage from "./pages/ProductsPage"
import ProductsListPage from "./pages/ProductsListPage"
import ProductsCreatePage from "./pages/ProductsCreatePage"
import ProductsEditPage from "./pages/ProductsEditPage"
import CategoriesPage from "./pages/CategoriesPage"
import CategoriesListPage from "./pages/CategoriesListPage"
import CategoriesCreatePage from "./pages/CategoriesCreatePage"
import CategoriesEditPage from "./pages/CategoriesEditPage"
import ProductVariantCreatePage from "./pages/ProductsCreateVariantPage"


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
            <Route path="/products/:productId/variants/new" element={<ProductVariantCreatePage />} />
        </>
    )
}

export default ProductsRoutes;