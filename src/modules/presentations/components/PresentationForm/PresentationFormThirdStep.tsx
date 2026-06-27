import { Box } from "@mui/material";
import FormCard from "../../../shared/components/FormGrid/FormCard";
import PresentationExpirationField from "./PresentationExpirationField";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";

const PresentationFormThirdStep = (): React.ReactNode => {
    const { currentStep, actionTitle} = useFormNavigation();

    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <FormCard submitText={actionTitle === "create" ? "Crear" : "Actualizar"} showButtons  multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}>
            <PresentationExpirationField />
        </FormCard>
    </Box>
)};

export default PresentationFormThirdStep;