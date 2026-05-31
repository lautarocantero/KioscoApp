// modules/productVariants/pages/ProductVariantEditPage.tsx

import React from "react";
import AppLayout from "../../shared/layout/AppLayout";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import ProductVariantEditFormComponent from "../components/ProductVariantDetail/ProductVariantDetailForm";

// # Componente: ProductVariantEditPage
//
// ## Descripción 📦
// Página destinada a la visualización de una presentación existente.
// Solo actúa como shell visual — no contiene lógica de negocio.
//
// ## Notas técnicas 💽
// - El ID de la presentación es leído dentro de `useProductVariantForm`
//   vía `useParams` (`variantId`).
// - Toda la lógica reside en el hook en modo "edit" (solo lectura).

const ProductVariantEditPage = (): React.ReactNode => {
    return (
        <AppLayout title="Detalle de presentación">
            <SimpleGrid title="detalle de presentación" position="normal">
                <ProductVariantEditFormComponent />
            </SimpleGrid>
        </AppLayout>
    );
};

export default ProductVariantEditPage;