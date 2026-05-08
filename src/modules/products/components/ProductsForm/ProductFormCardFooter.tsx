import { Box, Typography, type Theme } from "@mui/material";

const ProductFormCardFooter = (): React.ReactNode => (
    <Box sx={{ px: 3, py: 1.5, borderTop: "0.5px solid rgba(255,255,255,0.07)" }}>
        <Typography sx={(theme: Theme) => ({
            fontSize: "0.72rem", color: theme.custom?.fontColorTransparent, opacity: 0.6,
        })}>
            <Box component="span" sx={{ color: "#0386EE", mr: 0.5 }}>*</Box>
            Campos requeridos
        </Typography>
    </Box>
);

export default ProductFormCardFooter;