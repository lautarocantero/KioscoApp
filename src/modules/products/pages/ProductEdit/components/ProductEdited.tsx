import type { ProductEditedProps } from "@typings/product/productComponentTypes";
import SuccessCard from "../../../../shared/components/SuccessCard";
import { useNavigate } from "react-router-dom";


const ProductEdited = ({ updatedProduct }: ProductEditedProps): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <SuccessCard
            name={updatedProduct.name}
            title="Producto actualizado correctamente"
            subtitle="Los cambios fueron guardados. Podés seguir editando o volver a la lista."
            actions={[
                {
                    label:   "Ver productos",
                    variant: "outlined",
                    onClick: () => navigate("/products"),
                },
            ]}
        />
    );
};

export default ProductEdited;
