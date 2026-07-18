import SuccessCard from "../../../../shared/components/SuccessCard";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import type { ProductCreatedComponentProps } from "@typings/product/productComponentTypes";


const ProductCreated = ({ createdProduct, handleCreatePresentation, handleSeeDetail, handleCreateAnotherProduct, handleBackToProducts }: ProductCreatedComponentProps): React.ReactNode => {

    return (
        <SuccessCard
            name={createdProduct.name}
            title="¡Producto creado correctamente!"
            subtitle="El siguiente paso es agregar las presentaciones del producto para ponerlo a la venta."
            timeline={<ProductCreatedTimeline />}
            actions={[
                {
                    label:   "Crear Presentación",
                    variant: "contained",
                    onClick: handleCreatePresentation,
                },
                {
                    label:   "Ver detalle de Producto",
                    variant: "outlined",
                    onClick: handleSeeDetail,
                },
                {
                    label:   "Crear otro Producto",
                    variant: "outlined",
                    onClick: handleCreateAnotherProduct,
                },
                {
                    label:   "Ver Productos",
                    variant: "outlined",
                    onClick: handleBackToProducts,
                },
            ]}
        />
    );
};

export default ProductCreated;
