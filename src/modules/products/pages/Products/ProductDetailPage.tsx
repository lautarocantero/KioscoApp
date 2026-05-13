import AppLayout from "../../../shared/layout/AppLayout";
import ProductDetailFormComponent from "../../components/ProductDetail/ProductDetailForm";


// # Componente: ProductDetailPage
//
// ## Descripción 📦
// Página destinada a la visualización de un producto existente.
// Solo actúa como shell visual — no contiene lógica de negocio.
//
// ## Funciones 🔧
// - `ProductDetailPage`: componente de presentación puro.
//   - Envuelve el formulario de detalle dentro del layout compartido.
//   - El ID del producto es leído dentro de `useProductsForm` vía `useParams`.
//
// ## Notas técnicas 💽
// - Toda la lógica reside en `useProductsForm` (modo edición, solo lectura).
// - La composición atómica del formulario vive en `ProductDetailFormComponent`.
//-----------------------------------------------------------------------------//

const ProductDetailPage = (): React.ReactNode => {
    return (
        <AppLayout title="Detalle del producto">
            <ProductDetailFormComponent />
        </AppLayout>
    );
};

export default ProductDetailPage;