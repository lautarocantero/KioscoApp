import { Box, Typography, type Theme } from "@mui/material";

const ProductFormCardHeader = (): React.ReactNode => (
    <Box sx={{
        display: "flex", alignItems: "center", gap: 1.5,
        px: 3, py: 2,
        borderBottom: "0.5px solid rgba(255,255,255,0.07)",
    }}>
        <Box sx={{
            width: 34, height: 34, borderRadius: "8px",
            background: "rgba(3,134,238,0.15)",
            display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0,
        }}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <rect x="2"  y="2"    width="5.5" height="7"   rx="1.5" fill="#0386EE" opacity="0.9" />
                <rect x="9"  y="7"    width="5"   height="5"   rx="1.5" fill="#0386EE" opacity="0.5" />
                <rect x="9"  y="2"    width="5"   height="4"   rx="1.5" fill="#0386EE" opacity="0.7" />
                <rect x="2"  y="10.5" width="5.5" height="3.5" rx="1.5" fill="#0386EE" opacity="0.4" />
            </svg>
        </Box>
        <Box>
            <Typography sx={(theme: Theme) => ({
                fontSize: "0.88rem", fontWeight: 500, lineHeight: 1.3,
                color: theme.custom?.white ?? "rgba(255,255,255,0.88)",
            })}>
                Datos del producto
            </Typography>
            <Typography sx={(theme: Theme) => ({
                fontSize: "0.75rem", color: theme.custom?.fontColorTransparent, mt: "2px",
            })}>
                Información general — aplica a todas las presentaciones
            </Typography>
        </Box>
    </Box>
);

export default ProductFormCardHeader;