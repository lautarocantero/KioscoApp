import { Box } from "@mui/material";
import ProductVariantStockFields from "./PresentationStockFields";
import PresentationFormCard from "../PresentationFormFirstStep/PresentationFormCard";

const ProductVariantFormSecondStep = (): React.ReactNode => (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <PresentationFormCard submitText="Crear" showButtons>
            <ProductVariantStockFields />
        </PresentationFormCard>
    </Box>
);

export default ProductVariantFormSecondStep;