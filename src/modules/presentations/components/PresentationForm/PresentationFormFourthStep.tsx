import { useTheme } from "@mui/material/styles";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";
import FormFieldsRenderer from "../../../shared/components/FormCard/FormFieldsRenderer";


const PresentationFormFourthStep = (): ReactNode => {
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
                sectionLabel="Datos comerciales de la presentación"
                registry={PRESENTATION_FIELD_REGISTRY}
                fields={["price", "expiration_date"]}
                icons={{
                    price: { icon: <AttachMoneyOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                    expiration_date: { icon: <EventBusyOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink },
                }}
            />
        </FormCard>
)};

export default PresentationFormFourthStep;