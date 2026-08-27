import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ShopMonthlyReportVariationChipProps } from "@typings/stadistics/stadisticsComponentTypes";

// Chip de variación reutilizado por los KPIs y las filas de vendedores:
// verde cuando la variación es positiva, gris neutro cuando no lo es (el
// theme no usa rojo para esto — ver Design Tokens del handoff).
const ShopMonthlyReportVariationChip = ({ isPositive, label }: ShopMonthlyReportVariationChipProps): React.ReactNode => (
    <Box
        component="span"
        sx={(theme: Theme) => ({
            display: "inline-flex",
            alignItems: "center",
            px: 1,
            py: 0.25,
            borderRadius: "999px",
            fontSize: "0.62rem",
            fontWeight: 700,
            letterSpacing: "0.04em",
            textTransform: "uppercase",
            bgcolor: isPositive ? alpha(theme.palette.secondary.main, 0.14) : alpha(theme.custom.white, 0.08),
            color: isPositive ? theme.palette.secondary.main : theme.custom.darkWhite,
        })}
    >
        {label}
    </Box>
);

export default ShopMonthlyReportVariationChip;
