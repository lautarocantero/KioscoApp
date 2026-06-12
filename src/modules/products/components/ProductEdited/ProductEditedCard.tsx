import { Card, CardContent } from "@mui/material";
import ProductEditedBody from "./ProductEditedBody";
import ProductEditedActions from "./ProductEditedActions";
import type { ProductEditedCardProps } from "@typings/product/productComponentTypes";


const ProductEditedCard = ({ updatedProduct }: ProductEditedCardProps): React.ReactNode => (
    <Card sx={theme => ({
        width: "100%",
        maxWidth: 720,
        backgroundColor: theme.custom.white,
        borderRadius: "24px",
        overflow: "hidden",
        boxShadow: "0 12px 32px rgba(0,0,0,0.12)",
    })}>
        <CardContent sx={{ p: 0 }}>
            <ProductEditedBody name={updatedProduct.name} />
            <ProductEditedActions productId={updatedProduct._id} />
        </CardContent>
    </Card>
);

export default ProductEditedCard;