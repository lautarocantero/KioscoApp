import { useTheme } from "@mui/material";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import CategoryOutlinedIcon from "@mui/icons-material/CategoryOutlined";
import StraightenOutlinedIcon from "@mui/icons-material/StraightenOutlined";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import type { ReactNode } from "react";
import { useFormikContext } from "formik";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";
import { getFormatStepConfig } from "./presentationFormStepConfig";


const PresentationFormFormatStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle, currentStep, submitError, stepErrors } = useFormNavigation();
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);
    const { values } = useFormikContext<PresentationFormValues>();
    const { fields: formatFields, registryOverride } = getFormatStepConfig(values);

    return (
        <FormCard
            submitText={isCreate ? "Crear" : "Actualizar"}
            showButtons
            header={{ title: headerTitle }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{
                stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS,
                currentStep
            }}
        >
            <FormFieldsRenderer<PresentationFormValues>
                idPrefix="presentation"
                sectionLabel="Formato y tamaño de la presentación"
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