import "dayjs/locale/es";
import { useNavigate, useParams } from "react-router-dom";
import EmptyStateCard from "../EmptyStateCard/EmptyStateCard";


const EmptyPresentationAnalytics = (): React.ReactNode => {
    
    const { product_id: productIdFromUrl } = useParams<{ product_id: string }>();
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt="Vista previa de la imagen"
            title="No hay presentaciones disponibles"
            description={
                <>
                    Aún no se registraron presentaciones en el sistema <br />
                    Creá una nueva presentación para comenzar a ver tus métricas
                </>
            }
            button={{
                buttonText: "Crear presentación",
                onButtonClick: () => navigate(`/products/${productIdFromUrl}/presentation-create`),
            }}
        />
    );
};

export default EmptyPresentationAnalytics;