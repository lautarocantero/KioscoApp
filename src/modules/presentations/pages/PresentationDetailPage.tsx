import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductVariantDetailFormComponent from "../components/ProductVariantDetail/ProductVariantDetailForm";

// # Componente: PresentationDetailPage
// Página de solo lectura para visualizar todos los datos de una presentación.
// Ruta: /products/:productId/presentations/:variant_id

const PresentationDetailPage = (): React.ReactNode => {
    return (
        <AppLayout isOptions title="Detalle de presentación">
            <SimpleGrid title="Detalle de presentación" position="normal">
                <ProductVariantDetailFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default PresentationDetailPage;
