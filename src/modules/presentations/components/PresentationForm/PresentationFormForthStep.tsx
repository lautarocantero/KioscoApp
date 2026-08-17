import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { useFormikContext } from "formik";
import { getStockStepConfig, getPresentationStepsLabels } from "./presentationFormStepConfig";


const PresentationFormThirdStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: stockFields, registryOverride } = getStockStepConfig(t, values);

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
                sectionLabel={t("presentations.form.sections.stock")}
                registry={registryOverride}
                fields={stockFields}
                icons={{
                    stock: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    min_stock: { icon: <ReportProblemOutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                }}
            />
        </FormCard>
    );
};

export default PresentationFormThirdStep;