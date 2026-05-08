import { Box } from "@mui/material";
import ProductCreatedCard from "./ProductCreatedCard";
import type { ProductCreatedProps } from "@typings/product/productComponentTypes";


const ProductCreated = ({ createdProduct }: ProductCreatedProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <ProductCreatedCard createdProduct={createdProduct} />
    </Box>
);

export default ProductCreated;