import { Box } from "@mui/material";
import ProductFormCard from "./ProductFormCard";
import ProductFormFields from "./ProductFormFields";

const ProductsFormFirstStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
        <ProductFormCard submitText="Crear">
            <ProductFormFields mode="create" />
        </ProductFormCard>
    </Box>
);

export default ProductsFormFirstStep;