import { Box } from "@mui/material";
import ProductVariantFormCard from "./ProductVariantFormCard";

const ProductVariantFormFirstStep = (): React.ReactNode => (
    <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        minHeight: "auto", p: 2, pt: 0,
    }}>
        <ProductVariantFormCard />
    </Box>
);

export default ProductVariantFormFirstStep;