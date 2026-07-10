import { Box } from "@mui/material";
import FormCard from "../../../shared/components/FormCard/FormCard";
import ExpirationField from "../../../shared/components/FormCard/ExpirationField";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import EventBusyOutlinedIcon from "@mui/icons-material/EventBusyOutlined";

const PresentationFormThirdStep = (): React.ReactNode => {
    const { currentStep, actionTitle} = useFormNavigation();

    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <FormCard submitText={actionTitle === "create" ? "Crear" : "Actualizar"} showButtons  multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}>
            <ExpirationField icon={{ icon: <EventBusyOutlinedIcon fontSize="small" />, color: "#EC4899" }} />
        </FormCard>
    </Box>
)};

export default PresentationFormThirdStep;