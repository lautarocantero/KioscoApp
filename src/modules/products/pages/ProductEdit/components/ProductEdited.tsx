import type { ProductEditedProps } from "@typings/product/productComponentTypes";
import SuccessCard from "../../../../shared/components/SuccessCard";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";


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
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   "Ver Productos",
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default ProductEdited;