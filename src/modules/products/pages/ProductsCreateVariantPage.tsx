import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import PresentationFormComponent from "../../presentations/components/ProductVarianForm/PresentationForm";

// # Componente: PresentationCreatePage
// Página destinada a la creación de presentaciones/variantes de un producto.
// Recibe el productId por parámetro de ruta: /products/:productId/presentations/new

const PresentationCreatePage = (): React.ReactNode => {
    return (
        <AppLayout isOptions title="Crear presentación">
            <SimpleGrid title="crear presentación" position="normal">
                <PresentationFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default PresentationCreatePage;
