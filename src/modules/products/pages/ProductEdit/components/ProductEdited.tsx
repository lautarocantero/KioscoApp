import type { ProductEditedProps } from "@typings/product/productComponentTypes";
import SuccessCard from "../../../../shared/components/SuccessCard";


const ProductEdited = ({ updatedProduct, handleSeeDetail, handleBackToProducts }: ProductEditedProps): React.ReactNode => {
    

    return (
        <SuccessCard
            name={updatedProduct.name}
            title="Producto actualizado correctamente"
            subtitle="Los cambios fueron guardados. Podés seguir editando o volver a la lista."
            actions={[
                {
                    label:   "Ver detalle de Producto",
                    variant: "contained",
                    onClick: handleSeeDetail,
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

export default ProductEdited;
