import "dayjs/locale/es";
import { useTranslation } from "react-i18next";
import type { EmptyProductListProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";


const EmptyProductsList = ({isEmpty}: EmptyProductListProps ): ReactNode => {
    const { t } = useTranslation();

    if(!isEmpty) return null;

    return (
        <EmptyStateCard
            imageSrc={getPublicAssetUrl("images/stocko_images/empty_product_list.png")}
            imageAlt={t("cart.productsExhibitor.empty.imageAlt")}
            title={t("cart.productsExhibitor.empty.title")}
            description={
                <>
                    {t("cart.productsExhibitor.empty.description")} <br />
                </>
            }
            centered
        />
    );
};

export default EmptyProductsList;