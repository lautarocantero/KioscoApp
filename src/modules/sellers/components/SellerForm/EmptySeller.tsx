import { useNavigate } from "react-router-dom";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import type { ReactNode } from "react";

const EmptySeller = (): ReactNode => {
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt="No se encontró el vendedor"
            title="No se encontró el vendedor"
            description={
                <>
                    El vendedor que buscás no existe o fue eliminado <br />
                    Volvé al listado para ver tus vendedores
                </>
            }
            button={{
                buttonText: "Ir a vendedores",
                onButtonClick: () => navigate("/sellers"),
            }}
        />
    );
};

export default EmptySeller;
