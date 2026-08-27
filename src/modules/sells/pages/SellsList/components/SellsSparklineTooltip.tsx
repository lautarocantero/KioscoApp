import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { TooltipContentProps } from "recharts";
import type { NameType, ValueType } from "recharts/types/component/DefaultTooltipContent";
import { formatCurrency } from "../../../../cart/helpers/formatCurrency";

const SellsSparklineTooltip = ({ active, payload }: TooltipContentProps<ValueType, NameType>): React.ReactNode => {
    if (!active || !payload?.length) return null;

    const point = payload[0]?.payload as { label: string; total: number } | undefined;
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
            <Typography variant="caption" sx={(theme: Theme) => ({ display: "block", color: theme.palette.text.secondary })}>
                {point.label}
            </Typography>
            <Typography variant="caption" sx={(theme: Theme) => ({ fontWeight: 700, color: theme.custom.fontColor })}>
                {formatCurrency(point.total)}
            </Typography>
        </Box>
    );
};

export default SellsSparklineTooltip;
