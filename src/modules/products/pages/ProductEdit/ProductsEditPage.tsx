import ProductForm from "../../components/ProductForm/ProductForm";
import AppLayout from "../../../shared/layout/AppLayout";


// # Componente: ProductsEditPage
//
// ## Descripción 📦
// Página destinada a la edición de un producto existente.
// Solo actúa como shell visual — no contiene lógica de negocio.
//
// ## Funciones 🔧
// - `ProductsEditPage`: componente de presentación puro.
//   - Envuelve el formulario de edición dentro del layout compartido.
//   - El ID del producto es leído dentro de `useProductsForm` vía `useParams`.
//
// ## Notas técnicas 💽
// - Toda la lógica reside en `useProductsForm` (modo edición).
// - La composición atómica del formulario vive en `ProductsEditFormComponent`.
//-----------------------------------------------------------------------------//

const ProductsEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar producto">
            <ProductForm mode="edit"  />
        </AppLayout>
    );
};

export default ProductsEditPage;
