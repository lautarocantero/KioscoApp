import { useNavigate } from "react-router-dom";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

const EmptyProvider = (): React.ReactNode => {
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc={getPublicAssetUrl("images/stocko_images/empty_box.png")}
            imageAlt="No se encontró el proveedor"
            title="No se encontró el proveedor"
            description={
                <>
                    El proveedor que buscás no existe o fue eliminado <br />
                    Volvé al listado para ver tus proveedores
                </>
            }
            button={{
                buttonText: "Ir a proveedores",
                onButtonClick: () => navigate("/providers"),
            }}
        />
    );
};

export default EmptyProvider;
