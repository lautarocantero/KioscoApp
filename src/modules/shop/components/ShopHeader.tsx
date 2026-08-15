import { Box, Typography, type Theme } from "@mui/material";
import type { ShopHeaderProps } from "@typings/shop/shopComponentTypes";

const ShopHeader = ({ greeting }: ShopHeaderProps): React.ReactNode => (
    <Box component="header" sx={{ width: "100%" }}>
        <Typography
            variant="body2"
            sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 0.5 })}
        >
            {greeting}
        </Typography>
        <Typography variant="h4" component="h1" sx={{ fontWeight: 600 }}>
            Tienda
        </Typography>
        <Typography
            variant="body2"
            sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 0.5 })}
        >
            Este es el resumen general de tu negocio.
        </Typography>
    </Box>
);

export default ShopHeader;
