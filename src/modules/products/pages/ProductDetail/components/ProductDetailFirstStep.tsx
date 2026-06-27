import { Box } from "@mui/material";
import FormCard from "../../../../shared/components/FormGrid/FormCard";
import ProductFormFields from "../../../components/ProductForm/ProductFormFields";

const ProductDetailFirstStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
        <FormCard readOnly backPath="/products">
            <ProductFormFields mode="view" disabled />
        </FormCard>
    </Box>
);

export default ProductDetailFirstStep;