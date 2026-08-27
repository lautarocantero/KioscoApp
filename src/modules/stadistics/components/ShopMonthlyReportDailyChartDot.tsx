import { useTheme } from "@mui/material";
import type { DotItemDotProps } from "recharts";
import type { DailySalePoint } from "@typings/stadistics/stadisticsTypes";

// Punto del LineChart de ventas por día: violeta y chico por defecto, verde y
// más grande en el mejor día — mismo criterio de color que usaba el Cell del
// BarChart anterior, adaptado al render-prop `dot` de Line.
const ShopMonthlyReportDailyChartDot = (props: DotItemDotProps): React.ReactNode => {
    const theme = useTheme();
    const { cx, cy, payload } = props;
    if (typeof cx !== "number" || typeof cy !== "number") return null;

    const point = payload as DailySalePoint;
    const isBest = Boolean(point?.isBest);

    return (
        <circle
            cx={cx}
            cy={cy}
            r={isBest ? 4.5 : 2.5}
            fill={isBest ? theme.palette.secondary.main : theme.palette.primary.main}
            stroke={theme.custom.lightBackground}
            strokeWidth={isBest ? 1.5 : 1}
        />
    );
};

export default ShopMonthlyReportDailyChartDot;
