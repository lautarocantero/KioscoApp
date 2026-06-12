import { Card, CardContent } from "@mui/material";
import ProductCreatedBody from "./ProductCreatedBody";
import ProductCreatedActions from "./ProductCreatedActions";
import type { ProductCreatedProps } from "@typings/product/productComponentTypes";


const ProductCreatedCard = ({ createdProduct }: ProductCreatedProps): React.ReactNode => (
    <Card
        sx={theme => ({
            width: "100%",
            maxWidth: 720,
            backgroundColor: theme.custom.white,
            borderRadius: "24px",
            overflow: "hidden",
            boxShadow: `
                0 12px 32px rgba(0,0,0,0.12)
            `,
    })}
>
    <CardContent sx={{ p: 0 }}>
        <ProductCreatedBody
            name={createdProduct.name}
        />

        <ProductCreatedActions
            productId={createdProduct._id}
        />
    </CardContent>
</Card>

    
);

export default ProductCreatedCard;