import { useNavigate } from "react-router-dom";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import type { ReactNode } from "react";

const EmptySellDetail = (): ReactNode => {
    const navigate = useNavigate();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt="No se encontró la venta"
            title="No se encontró la venta"
            description={
                <>
                    La venta que buscás no existe o fue eliminada <br />
                    Volvé al listado para ver tus ventas
                </>
            }
            button={{
                buttonText: "Ir a ventas",
                onButtonClick: () => navigate("/sells"),
            }}
        />
    );
};

export default EmptySellDetail;