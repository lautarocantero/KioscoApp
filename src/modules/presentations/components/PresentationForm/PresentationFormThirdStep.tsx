import { useTheme } from "@mui/material/styles";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import FormFieldsRenderer from "modules/shared/components/FormCard/FormFieldsRenderer";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";


const PresentationFormThirdStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation(); 
    const { isCreate, headerTitle } = usePresentationFormHeader(actionTitle);

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
                sectionLabel="Vencimiento de la presentación"
                registry={PRESENTATION_FIELD_REGISTRY}
                fields={["expiration_date"]}
                icons={{ expiration_date: { icon: <EventBusyOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink } }}
            />
        </FormCard>
)};

export default PresentationFormThirdStep;