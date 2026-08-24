import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import BookmarkBorderOutlinedIcon from "@mui/icons-material/BookmarkBorderOutlined";
import DescriptionOutlinedIcon from "@mui/icons-material/DescriptionOutlined";
import SellOutlinedIcon from "@mui/icons-material/SellOutlined";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import { getPresentationFieldRegistry } from "./PresentationFieldRegistry";
import { getPresentationStepsLabels } from "./presentationFormStepConfig";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";


const PresentationFormFirstStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation();
    const { product_id } = useParams<{ product_id: string }>();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const registry = getPresentationFieldRegistry(t);

    return (
        <FormCard
            submitText={isCreate ? t("presentations.form.submit.create") : t("presentations.form.submit.update")}
            showButtons
            header={{ title: headerTitle }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{
                stepsLabels: getPresentationStepsLabels(t),
                currentStep
            }}
            accordion={{
                title: t("presentations.form.accordion.title"),
                content: t("presentations.form.accordion.content"),
                bannerImage: {
                    src: getPublicAssetUrl("images/productExample/presentations.jpg"),
                    alt: t("presentations.form.accordion.bannerAlt"),
                },
            }}
            defaultBack={`/products/${product_id}/presentations`}
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel={t("presentations.form.sections.identity")}
                registry={registry}
                fields={["sale_type", "name", "description", "category"]}
                icons={{
                    sale_type: { icon: <SellOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                    name: { icon: <BookmarkBorderOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                    description: { icon: <DescriptionOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                    category: { icon: <CategoryOutlinedIcon fontSize="small" />, color: theme.custom.accents.blue },
                }}
            />
        </FormCard>
    );};

export default PresentationFormFirstStep;