// modules/productVariants/pages/PresentationEditPage.tsx

import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import ProductVariantEditFormComponent from "../components/PresentationEdit/PresentationEditForm";

const PresentationEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar presentación">
            <ProductVariantEditFormComponent />
        </AppLayout>
    );
};

export default PresentationEditPage;