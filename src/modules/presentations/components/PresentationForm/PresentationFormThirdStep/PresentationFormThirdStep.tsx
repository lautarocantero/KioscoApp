import { Box } from "@mui/material";
import PresentationFormCard from "../PresentationFormCard";
import PresentationExpirationField from "./PresentationExpirationField";
import { useFormNavigation } from "../../../../../modules/products/context/FormNavigationContext";

const PresentationFormThirdStep = (): React.ReactNode => {
    const { currentStep, actionTitle} = useFormNavigation();

    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <PresentationFormCard submitText={actionTitle === "create" ? "Crear" : "Actualizar"} showButtons  currentStep={currentStep}>
            <PresentationExpirationField />
        </PresentationFormCard>
    </Box>
)};

export default PresentationFormThirdStep;