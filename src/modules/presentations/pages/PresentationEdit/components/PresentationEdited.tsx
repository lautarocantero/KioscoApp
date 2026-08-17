import { useTranslation } from "react-i18next";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import type { PresentationEditedProps } from "@typings/presentation/presentationComponentTypes";
import type { ReactNode } from "react";
import SuccessCard from "../../../../shared/components/SuccessCard/SuccessCard";


const PresentationEdited = ({
    updatedPresentation,
    handleSeeDetail,
    handleBackToPresentations,
    handleBackToProducts
}: PresentationEditedProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <SuccessCard
            name={updatedPresentation.name}
            title={t("presentations.edited.title")}
            subtitle={t("presentations.edited.subtitle")}
            actions={[
                {
                    label:   t("presentations.edited.actions.viewDetail"),
                    variant: "contained",
                    onClick: handleSeeDetail,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("presentations.edited.actions.viewPresentations"),
                    variant: "outlined",
                    onClick: handleBackToPresentations,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
                {
                    label:   t("presentations.edited.actions.viewProducts"),
                    variant: "outlined",
                    onClick: handleBackToProducts,
                    icon:    <VisibilityOutlinedIcon fontSize="small" />,
                },
            ]}
        />
    );
};

export default PresentationEdited;