import { useTheme } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { getPricingStepConfig, getPresentationStepsLabels } from "./presentationFormStepConfig";


const PresentationFormFourthStep = (): ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: pricingFields, registryOverride } = getPricingStepConfig(t, values);

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
                sectionLabel={t("presentations.form.sections.commercial")}
                registry={registryOverride}
                fields={pricingFields}
                icons={{
                    price: { icon: <AttachMoneyOutlinedIcon fontSize="small" />, color: theme.custom.accents.gold },
                    expiration_date: { icon: <EventBusyOutlinedIcon fontSize="small" />, color: theme.custom.accents.gold },
                }}
            />
        </FormCard>
)};

export default PresentationFormFourthStep;