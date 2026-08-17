import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { getFormatStepConfig, getPresentationStepsLabels } from "./presentationFormStepConfig";


const PresentationFormFormatStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: formatFields, registryOverride } = getFormatStepConfig(t, values);

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
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel={t("presentations.form.sections.format")}
                registry={registryOverride}
                fields={formatFields}
                icons={{
                    model_type: { icon: <CategoryOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    model_size: { icon: <StraightenOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                    model_unit: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                }}
            />
        </FormCard>
    );
};

export default PresentationFormFormatStep;