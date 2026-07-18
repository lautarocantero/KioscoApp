import SuccessCard from "../../../../shared/components/SuccessCard";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
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
                    icon:    <AddOutlinedIcon fontSize="small" />,
                },
                {
                    label:   "Ver detalle de Producto",
                    variant: "outlined",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   "Crear otro Producto",
                    variant: "outlined",
                    onClick: handleCreateAnotherProduct,
                    icon:    <AddOutlinedIcon fontSize="small" />,
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

export default ProductCreated;