import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductVariantFormComponent from "../../../modules/productVariants/components/ProductVariantForm";

// # Componente: ProductVariantCreatePage
// Página destinada a la creación de presentaciones/variantes de un producto.
// Recibe el productId por parámetro de ruta: /products/:productId/variants/new

const ProductVariantCreatePage = (): React.ReactNode => {
    return (
        <AppLayout isOptions title="Crear presentación">
            <SimpleGrid title="crear presentación" position="normal">
                <ProductVariantFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default ProductVariantCreatePage;
