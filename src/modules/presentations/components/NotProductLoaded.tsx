import { Box, Typography } from "@mui/material";
import type { NoProductLoadedComponentProps } from "@typings/product/productTypes";


const NoProductLoadedComponent = ({ productError }: NoProductLoadedComponentProps) => (
    <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "400px" }}>
        <Typography color="error">
            {productError ?? "No se pudo cargar los datos del producto"}
        </Typography>
    </Box>
);

export default NoProductLoadedComponent;