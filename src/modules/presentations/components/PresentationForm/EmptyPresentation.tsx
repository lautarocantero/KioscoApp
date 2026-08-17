import { useNavigate, useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";

const EmptyPresentation = (): React.ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { product_id } = useParams<{ product_id: string }>();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt={t("presentations.empty.imageAlt")}
            title={t("presentations.empty.title")}
            description={
                <>
                    {t("presentations.empty.descriptionLine1")} <br />
                    {t("presentations.empty.descriptionLine2")}
                </>
            }
            button={{
                buttonText: t("presentations.empty.button"),
                onButtonClick: () => navigate(`/products/${product_id}/presentations`),
            }}
        />
    );
};

export default EmptyPresentation;