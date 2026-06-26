import { Box } from "@mui/material";
import ProductEditedCard from "./ProductEditedCard";
import type { ProductEditedProps } from "@typings/product/productComponentTypes";


const ProductEdited = ({ updatedProduct }: ProductEditedProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <ProductEditedCard updatedProduct={updatedProduct} />
    </Box>
);

export default ProductEdited;