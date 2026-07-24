import "dayjs/locale/es";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import type { EmptyProductListProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";


const EmptyProductsList = ({isEmpty}: EmptyProductListProps ): ReactNode => {

    if(!isEmpty) return null;

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_product_list.png"
            imageAlt="Vista previa de la imagen"
            title="No hay productos disponibles"
            description={
                <>
                    No se han encontrado productos <br />
                </>
            }
            centered
        />
    );
};

export default EmptyProductsList;