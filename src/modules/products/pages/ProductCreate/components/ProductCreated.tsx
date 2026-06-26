import { useNavigate } from "react-router-dom";
import SuccessCard from "../../../../shared/components/SuccessCard";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import type { ProductCreatedProps } from "@typings/product/productComponentTypes";


const ProductCreated = ({ createdProduct }: ProductCreatedProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <SuccessCard
            name={createdProduct.name}
            title="Producto creado correctamente"
            subtitle="El siguiente paso es agregar las presentaciones del producto."
            timeline={<ProductCreatedTimeline />}
            actions={[
                {
                    label:   "Crear presentación",
                    variant: "contained",
                    onClick: () => navigate(`/products/${createdProduct._id}/presentations/new`),
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
