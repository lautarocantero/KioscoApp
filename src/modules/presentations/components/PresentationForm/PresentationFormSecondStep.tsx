import { Box } from "@mui/material";
import PresentationStockFields from "./PresentationStockFields";
import FormCard from "../../../shared/components/FormGrid/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";

const PresentationFormSecondStep = (): React.ReactNode => {
    const { currentStep } = useFormNavigation(); 
    
    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <FormCard submitText="Crear" showButtons  multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}>
            <PresentationStockFields />
        </FormCard>
    </Box>
)};

export default PresentationFormSecondStep;