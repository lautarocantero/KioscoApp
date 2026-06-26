import { Box } from "@mui/material";
import FormCard from "../../../../../../modules/shared/components/FormGrid/FormCard";
import ProductFormFields from "../../../../../../modules/products/components/ProductForm/ProductFormFields";

const ProductDetailFirstStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
        <FormCard
            submitText="" showButtons={false}
            
        >
            <ProductFormFields mode="view" disabled />
        </FormCard>
    </Box>
);

export default ProductDetailFirstStep;