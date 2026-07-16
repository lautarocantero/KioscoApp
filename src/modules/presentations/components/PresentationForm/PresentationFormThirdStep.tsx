import { useTheme } from "@mui/material/styles";
import FormCard from "../../../shared/components/FormCard/FormCard";
import ExpirationField from "../../../shared/components/FormCard/ExpirationField";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";
import type { ReactNode } from "react";


const PresentationFormThirdStep = (): ReactNode => {
    const theme = useTheme();
    const { actionTitle , currentStep, submitError, stepErrors  } = useFormNavigation(); 

    return (
        <FormCard 
            submitText={actionTitle === FormModeComplexEnum.Create ? "Crear" : "Actualizar"} 
            showButtons  
            header={{ title: actionTitle === FormModeComplexEnum.Create ? "Crear presentación" : "Editar presentación" }}
            submitError={submitError}
            stepErrors={stepErrors}
            multiStepHeader={{ 
                stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, 
                currentStep 
            }}
        >
            <ExpirationField icon={{ icon: <EventBusyOutlinedIcon fontSize="small" />, color: theme.custom.accents.pink }} />
        </FormCard>
)};

export default PresentationFormThirdStep;