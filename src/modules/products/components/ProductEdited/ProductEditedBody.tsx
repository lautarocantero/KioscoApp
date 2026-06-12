// ProductEditedBody.tsx
import { Box, Typography } from "@mui/material";
import ProductEditedName from "./ProductEditedName";

interface ProductEditedBodyProps {
    name: string;
}

const ProductEditedBody = ({ name }: ProductEditedBodyProps): React.ReactNode => (
    <Box sx={theme => ({ display: "flex", flexDirection: "column", alignItems: "center", py: 4, px: 3, backgroundColor: theme.custom.white, borderRadius: "16px" })}>

        <Typography sx={theme => ({ fontSize: theme.typography.h6?.fontSize, fontWeight: 700, color: theme.custom.backgroundDark, textAlign: "center", mb: 2 })}>
            Producto actualizado correctamente
        </Typography>

        <ProductEditedName name={name} />

        <Typography sx={theme => ({ maxWidth: 420, textAlign: "center", color: theme.custom.fontColorDark, opacity: 0.8, fontSize: "1rem", lineHeight: 1.6 })}>
            Los cambios fueron guardados. Podés seguir editando o volver a la lista.
        </Typography>
    </Box>
);

export default ProductEditedBody;