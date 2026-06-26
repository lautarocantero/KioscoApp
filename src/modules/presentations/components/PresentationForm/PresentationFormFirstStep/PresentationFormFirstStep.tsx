import { Box } from "@mui/material";
import PresentationFormCard from "../PresentationFormCard";
import PresentationFormFields from "./PresentationFormFields";
import PresentationImageUpload from "./PresentationImageUpload";
import { useFormNavigation } from "../../../../../modules/products/context/FormNavigationContext";

const PresentationFormFirstStep = (): React.ReactNode => {
    const { currentStep, actionTitle } = useFormNavigation(); 

    return (
    <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        minHeight: "auto", p: 2, pt: 0,
    }}>
        <PresentationFormCard submitText={actionTitle === "create" ? "Crear" : "Actualizar"} showButtons currentStep={currentStep}>
            <PresentationFormFields />
            <PresentationImageUpload />
        </PresentationFormCard>
    </Box>
    );};

export default PresentationFormFirstStep;