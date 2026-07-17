import "dayjs/locale/es";
import { useNavigate, useParams } from "react-router-dom";
import EmptyStateCard from "../EmptyStateCard/EmptyStateCard";

const EmptyPresentationAnalytics = (): React.ReactNode => {
    const { productId: productIdFromUrl } = useParams<{ productId: string }>();
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc="/images/kiosco_images/empty_box_3.png"
            imageAlt="Vista previa de la imagen"
            title="No hay presentaciones disponibles"
            description={
                <>
                    Aún no se registraron presentaciones en el sistema <br />
                    Creá una nueva presentación para comenzar a ver tus métricas
                </>
            }
            buttonText="Crear presentación"
            onButtonClick={() => navigate(`/products/${productIdFromUrl}/presentations/new`)}
        />
    );
};

export default EmptyPresentationAnalytics;