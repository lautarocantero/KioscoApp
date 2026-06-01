// modules/productVariants/pages/ProductVariantEditPage.tsx

import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductVariantEditFormComponent from "../components/ProductVariantEdit/ProductVariantEditForm";

const ProductVariantEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Editar presentación">
            <SimpleGrid title="Editar presentación" position="normal">
                <ProductVariantEditFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default ProductVariantEditPage;