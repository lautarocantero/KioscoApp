import { useNavigate } from "react-router-dom";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";

const EmptyProduct = (): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt="No se encontró el producto"
            title="No se encontró el producto"
            description={
                <>
                    El producto que buscás no existe o fue eliminado <br />
                    Volvé al listado para ver tus productos
                </>
            }
            button={{
                buttonText: "Ir a productos",
                onButtonClick: () => navigate("/products"),
            }}
        />
    );
};

export default EmptyProduct;