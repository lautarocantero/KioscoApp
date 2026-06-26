import { Box, Typography } from "@mui/material";
import type { ProductCreatedBodyProps } from "@typings/product/productComponentTypes";
import ProductCreatedTimeline from "./ProductCreatedTimeline";
import ProductCreatedName from "./ProductCreatedName";

const ProductCreatedBody = ({ name }: ProductCreatedBodyProps): React.ReactNode => (
    <Box sx={theme => ({ display: "flex", flexDirection: "column", alignItems: "center", py: 4, px: 3, backgroundColor: theme.custom.white, borderRadius: "16px" })}>
        <ProductCreatedTimeline />

        <Typography sx={theme => ({ fontSize: theme.typography.h6?.fontSize, fontWeight: 700, color: theme.custom.backgroundDark, textAlign: "center", mb: 2 })}>
            Producto creado correctamente
        </Typography>

        <ProductCreatedName name={name} />

        <Typography sx={theme => ({ maxWidth: 420, textAlign: "center", color: theme.custom.fontColorDark, opacity: 0.8, fontSize: "1rem", lineHeight: 1.6 })}>
            El siguiente paso es agregar las presentaciones del producto.
        </Typography>
    </Box>
);

export default ProductCreatedBody;