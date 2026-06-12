import { Box } from "@mui/material";
import type { UpdatedProductInterface } from "@typings/product/productTypes";
import ProductEditedCard from "./ProductEditedCard";

interface ProductEditedProps {
    updatedProduct: UpdatedProductInterface;
}

const ProductEdited = ({ updatedProduct }: ProductEditedProps): React.ReactNode => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "flex-start", p: 2, pt: 0 }}>
        <ProductEditedCard updatedProduct={updatedProduct} />
    </Box>
);

export default ProductEdited;