import React from "react";
import AppLayout from "../../../shared/layout/AppLayout";
import PresentationDetailFormComponent from "./components/PresentationDetailForm";

// # Componente: PresentationDetailPage
// Página de solo lectura para visualizar todos los datos de una presentación.
// Ruta: /products/:productId/presentations/:variant_id

const PresentationDetailPage = (): React.ReactNode => {
    return (
        <AppLayout title="Detalle de presentación">
            <PresentationDetailFormComponent />
        </AppLayout>
    );
};

export default PresentationDetailPage;
