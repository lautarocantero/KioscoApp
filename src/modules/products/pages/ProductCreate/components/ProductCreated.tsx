import { useNavigate } from "react-router-dom";
import SuccessCard from "../../../../shared/components/SuccessCard";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import type { ProductCreatedComponentProps } from "@typings/product/productComponentTypes";


const ProductCreated = ({ createdProduct, onCreateAnother }: ProductCreatedComponentProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <SuccessCard
            name={createdProduct.name}
            title="¡Producto creado correctamente!"
            subtitle="El siguiente paso es agregar las presentaciones del producto para ponerlo a la venta."
            timeline={<ProductCreatedTimeline />}
            actions={[
                {
                    label:   "Crear presentación",
                    variant: "contained",
                    onClick: onCreateAnother,
                },
                {
                    label:   "Volver a productos",
                    variant: "outlined",
                    onClick: () => navigate("/products"),
                },
            ]}
        />
    );
};

export default ProductCreated;
