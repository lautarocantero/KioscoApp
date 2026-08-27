import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import type { DailySalePoint } from "@typings/stadistics/stadisticsTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { formatDailyTooltipDate } from "../helpers/formatDailyTooltipDate";

// Igual que ShopSalesChartTooltip, pero usa isoDate del punto completo (no el
// label del eje, que solo trae el número de día) para mostrar la fecha
// completa — más fácil de ubicar que "21" a secas.
const ShopMonthlyReportDailyChartTooltip = ({ active, payload }: TooltipContentProps<ValueType, NameType>): React.ReactNode => {
    if (!active || !payload?.length) return null;

    const point = payload[0]?.payload as DailySalePoint | undefined;
    if (!point) return null;

    return (
        <Box
            sx={(theme: Theme) => ({
                bgcolor: alpha(theme.custom.darkBackground, 0.95),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.4),
                borderRadius: "8px",
                px: 1.5,
                py: 1,
            })}
        >
            <Typography
                variant="caption"
                sx={(theme: Theme) => ({ display: "block", color: theme.palette.text.secondary })}
            >
                {formatDailyTooltipDate(point.isoDate)}
            </Typography>
            <Typography
                variant="caption"
                sx={(theme: Theme) => ({ fontWeight: 700, color: theme.custom.fontColor })}
            >
                {formatCurrency(point.amount)}
            </Typography>
        </Box>
    );
};

export default ShopMonthlyReportDailyChartTooltip;
