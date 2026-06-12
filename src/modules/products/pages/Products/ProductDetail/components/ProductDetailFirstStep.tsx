import { Box } from "@mui/material";
import ProductFormCard from "../../../../components/ProductsForm/ProductFormCard";
import ProductFormFields from "../../../../components/ProductsForm/ProductFormFields";

const ProductDetailFirstStep = (): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", minHeight: "auto", p: 2, pt: 0 }}>
        <ProductFormCard 
            submitText="" showButtons={false}
            
        >
            <ProductFormFields mode="view" disabled />
        </ProductFormCard>
    </Box>
);

export default ProductDetailFirstStep;