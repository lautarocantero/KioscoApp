import { useNavigate, useParams } from "react-router-dom";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";

const EmptyPresentation = (): React.ReactNode => {
    const navigate = useNavigate();
    const { product_id } = useParams<{ product_id: string }>();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt="No se encontró la presentación"
            title="No se encontró la presentación"
            description={
                <>
                    La presentación que buscás no existe o fue eliminada <br />
                    Volvé al listado para ver las presentaciones del producto
                </>
            }
            button={{
                buttonText: "Ir a presentaciones",
                onButtonClick: () => navigate(`/products/${product_id}/presentations`),
            }}
        />
    );
};

export default EmptyPresentation;