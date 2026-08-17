import { useTranslation } from "react-i18next";
import type { PresentationCreatedProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import SuccessCard from "../../../../shared/components/SuccessCard/SuccessCard";


const PresentationCreated = ({
        createdPresentation,
        handleSeeDetail,
        handleBackToPresentations,
        handleBackToProducts
    }: PresentationCreatedProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <SuccessCard
            name={createdPresentation.name}
            title={t("presentations.created.title")}
            subtitle={t("presentations.created.subtitle")}
            actions={[
                {
                    label:   t("presentations.created.actions.viewDetail"),
                    variant: "contained",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("presentations.created.actions.viewPresentations"),
                    variant: "outlined",
                    onClick: handleBackToPresentations,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("presentations.created.actions.viewProducts"),
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default PresentationCreated;