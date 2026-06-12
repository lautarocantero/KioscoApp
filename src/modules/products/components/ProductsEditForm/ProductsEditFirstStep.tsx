import { Box } from "@mui/material";
import ProductFormCard from "../ProductsForm/ProductFormCard";
import ProductFormFields from "../ProductsForm/ProductFormFields";

const ProductsEditFirstStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
        <ProductFormCard submitText="Guardar" showButtons>
            <ProductFormFields mode="edit" />
        </ProductFormCard>
    </Box>
);

export default ProductsEditFirstStep;