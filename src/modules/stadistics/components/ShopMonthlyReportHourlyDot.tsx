import { useTheme } from "@mui/material";
import type { DotItemDotProps } from "recharts";
import type { HourlyBucket } from "@typings/stadistics/stadisticsTypes";

// Punto del LineChart de franjas horarias: violeta por defecto, verde en el
// pico y dorado en la franja más floja — mismo criterio de color que usaban
// las barras horizontales anteriores, adaptado al render-prop `dot` de Line.
const ShopMonthlyReportHourlyDot = (props: DotItemDotProps): React.ReactNode => {
    const theme = useTheme();
    const { cx, cy, payload } = props;
    if (typeof cx !== "number" || typeof cy !== "number") return null;

    const bucket = payload as HourlyBucket;
    const isPeak = Boolean(bucket?.isPeak);
    const isLow = Boolean(bucket?.isLow);
    const color = isPeak ? theme.palette.secondary.main : isLow ? theme.custom.accents.gold : theme.palette.primary.main;

    return (
        <circle
            cx={cx}
            cy={cy}
            r={isPeak || isLow ? 4.5 : 2.5}
            fill={color}
            stroke={theme.custom.lightBackground}
            strokeWidth={isPeak || isLow ? 1.5 : 1}
        />
    );
};

export default ShopMonthlyReportHourlyDot;
