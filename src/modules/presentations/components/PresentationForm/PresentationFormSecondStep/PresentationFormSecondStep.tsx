import { Box } from "@mui/material";
import ProductVariantStockFields from "./PresentationStockFields";
import PresentationFormCard from "../PresentationFormFirstStep/PresentationFormCard";
import { useFormNavigation } from "../../../../../modules/products/context/FormNavigationContext";

const ProductVariantFormSecondStep = (): React.ReactNode => {
    const { currentStep } = useFormNavigation(); 
    
    return (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <PresentationFormCard submitText="Crear" showButtons  currentStep={currentStep}>
            <ProductVariantStockFields />
        </PresentationFormCard>
    </Box>
)};

export default ProductVariantFormSecondStep;