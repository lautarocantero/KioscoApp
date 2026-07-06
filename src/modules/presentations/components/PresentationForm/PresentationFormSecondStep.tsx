import { Box } from "@mui/material";
import PresentationStockFields from "./PresentationStockFields";
import FormCard from "../../../shared/components/FormGrid/FormCard";
import { useFormNavigation } from "../../../shared/context/FormNavigationContext";
import { PRODUCTS_VARIANT_STEPS_LABELS } from "../../../../config/constants";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import ReportProblemOutlinedIcon from "@mui/icons-material/ReportProblemOutlined";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";

const PresentationFormSecondStep = (): React.ReactNode => {
    const { currentStep } = useFormNavigation(); 
    
    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <FormCard submitText="Crear" showButtons  multiStepHeader={{ stepsLabels: PRODUCTS_VARIANT_STEPS_LABELS, currentStep }}>
            <PresentationStockFields
                icons={{
                    stock: { icon: <Inventory2OutlinedIcon fontSize="small" />, color: "#8B5CF6" },
                    min_stock: { icon: <ReportProblemOutlinedIcon fontSize="small" />, color: "#F59E0B" },
                    price: { icon: <AttachMoneyOutlinedIcon fontSize="small" />, color: "#22C55E" },
                }}
            />
        </FormCard>
    </Box>
)};

export default PresentationFormSecondStep;