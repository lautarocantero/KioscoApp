// modules/productVariants/pages/PresentationEditPage.tsx

import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductVariantEditFormComponent from "../components/PresentationEdit/PresentationEditForm";

const PresentationEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar presentación">
            <SimpleGrid title="Editar presentación" position="normal">
                <ProductVariantEditFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default PresentationEditPage;