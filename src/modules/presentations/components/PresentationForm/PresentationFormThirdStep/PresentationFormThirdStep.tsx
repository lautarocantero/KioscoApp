import { Box } from "@mui/material";
import PresentationFormCard from "../PresentationFormFirstStep/PresentationFormCard";
import ProductVariantExpirationField from "./PresentationExpirationField";

const ProductVariantFormThirdStep = (): React.ReactNode => (
    <Box 
        sx={{
            display: "flex", justifyContent: "center", alignItems: "flex-start",
            minHeight: "auto", p: 2, pt: 0,
        }}>
        <PresentationFormCard submitText="Crear" showButtons>
            <ProductVariantExpirationField />
        </PresentationFormCard>
    </Box>
);

export default ProductVariantFormThirdStep;