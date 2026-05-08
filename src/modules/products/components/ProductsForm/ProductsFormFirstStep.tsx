import { Box } from "@mui/material";
import ProductFormCard from "./ProductFormCard";

const ProductsFormFirstStep = (): React.ReactNode => (
    <Box sx={{
        display: "flex", justifyContent: "center", alignItems: "flex-start",
        minHeight: "auto", p: 2, pt: 0,
    }}>
        <ProductFormCard />
    </Box>
);

export default ProductsFormFirstStep;