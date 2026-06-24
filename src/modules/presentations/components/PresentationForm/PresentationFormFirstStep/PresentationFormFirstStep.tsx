import { Box } from "@mui/material";
import PresentationFormCard from "./PresentationFormCard";
import ProductVariantFormFields from "./PresentationFormFields";
import ProductVariantImageUpload from "./PresentationImageUpload";

const ProductVariantFormFirstStep = (): React.ReactNode => (
    <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        minHeight: "auto", p: 2, pt: 0,
    }}>
        <PresentationFormCard submitText="Crear" showButtons>
            <ProductVariantFormFields />
            <ProductVariantImageUpload />
        </PresentationFormCard>
    </Box>
);

export default ProductVariantFormFirstStep;