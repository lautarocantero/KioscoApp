import { useTheme } from "@mui/material";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import type { ReactNode } from "react";
import { usePresentationFormHeader } from "../../../../hooks/presentations/usePresentationForm";
import FormFieldsRenderer from "modules/shared/components/FormCard/FormFieldsRenderer";
import type { PresentationFormValues } from "@typings/presentation/presentationTypes";
import { PRESENTATION_FIELD_REGISTRY } from "./PresentationFieldRegistry";


const PresentationFormSecondStep = (): ReactNode => {
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
                sectionLabel="Stock y operación de la presentación"
                registry={PRESENTATION_FIELD_REGISTRY}
                fields={["stock", "min_stock", "price"]}
                icons={{
                    stock: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    min_stock: { icon: <ReportProblemOutlinedIcon fontSize="small" />, color: theme.palette.warning.main },
                    price: { icon: <AttachMoneyOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
)};

export default PresentationFormSecondStep;