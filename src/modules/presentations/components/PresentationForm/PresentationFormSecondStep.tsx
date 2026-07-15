import { useTheme } from "@mui/material";
import PresentationStockFields from "./PresentationStockFields";
import FormCard from "../../../shared/components/FormCard/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import { FormModeComplexEnum } from "@typings/shared/sharedEnums";

const PresentationFormSecondStep = (): React.ReactNode => {
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
            <PresentationStockFields
                icons={{
                    stock: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: theme.custom.accents.violet },
                    min_stock: { icon: <ReportProblemOutlinedIcon fontSize="small" />, color: theme.palette.warning.main },
                    price: { icon: <AttachMoneyOutlinedIcon fontSize="small" />, color: theme.custom.accents.green },
                }}
            />
        </FormCard>
)};

export default PresentationFormSecondStep;