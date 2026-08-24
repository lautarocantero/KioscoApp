import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

const EmptyProduct = (): React.ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <EmptyStateCard
            imageSrc={getPublicAssetUrl("images/stocko_images/empty_box.png")}
            imageAlt={t("products.empty.imageAlt")}
            title={t("products.empty.title")}
            description={
                <>
                    {t("products.empty.descriptionLine1")} <br />
                    {t("products.empty.descriptionLine2")}
                </>
            }
            button={{
                buttonText: t("products.empty.button"),
                onButtonClick: () => navigate("/products"),
            }}
        />
    );
};

export default EmptyProduct;