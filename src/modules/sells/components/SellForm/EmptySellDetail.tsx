import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import EmptyStateCard from "../../../shared/components/EmptyStateCard/EmptyStateCard";
import type { ReactNode } from "react";

const EmptySellDetail = (): ReactNode => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    return (
        <EmptyStateCard
            imageSrc="/images/stocko_images/empty_box.png"
            imageAlt={t("sells.empty.imageAlt")}
            title={t("sells.empty.title")}
            description={
                <>
                    {t("sells.empty.descriptionLine1")} <br />
                    {t("sells.empty.descriptionLine2")}
                </>
            }
            button={{
                buttonText: t("sells.empty.button"),
                onButtonClick: () => navigate("/sells"),
            }}
        />
    );
};

export default EmptySellDetail;