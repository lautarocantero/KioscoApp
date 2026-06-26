import { Box } from "@mui/material";
import PresentationStockFields from "./PresentationStockFields";
import PresentationFormCard from "../PresentationFormCard";
import { useFormNavigation } from "../../../../shared/context/FormNavigationContext";

const PresentationFormSecondStep = (): React.ReactNode => {
    const { currentStep } = useFormNavigation(); 
    
    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <PresentationFormCard submitText="Crear" showButtons  currentStep={currentStep}>
            <PresentationStockFields />
        </PresentationFormCard>
    </Box>
)};

export default PresentationFormSecondStep;