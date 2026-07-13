// mappers/presentationAnalytics.mapper.tsx
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import type { Theme } from "@mui/material/styles";
import type { RangeResult } from "@typings/ui/analytics.types";
import type { PresentationAnalyticsData } from "@typings/shared/types/useAnalyticsFormState.types";
import {
    formatDayLabel,
    formatRangeLabel,
    deltaPct,
    buildStockEvolution,
    getTopSellingDays,
    getPeriodStats,
    getAvgTicket,
} from "./AnalyticsHelper";

export const mapPresentationAnalytics = (
    title: string,
    subtitle: string,
    from: Date,
    to: Date,
    previousFrom: Date,
    previousTo: Date,
    current: RangeResult,
    previous: RangeResult,
    currentStock: number,
    theme: Theme,
): PresentationAnalyticsData => {
    const comparisonLabel = `vs ${formatRangeLabel(previousFrom, previousTo)}`;

    const currentAvgTicket = getAvgTicket(current);
    const previousAvgTicket = getAvgTicket(previous);

    const { maxDay, minDay, avgUnits } = getPeriodStats(current.dailyBuckets);

    return {
        title,
        subtitle,
        dateRangeLabel: formatRangeLabel(from, to),
        kpis: [
            {
                id: "units",
                label: "Unidades vendidas",
                value: current.totalUnits.toLocaleString("es-AR"),
                deltaPct: deltaPct(current.totalUnits, previous.totalUnits),
                comparisonLabel,
                icon: <AddCircleOutlineIcon fontSize="small" />,
                iconColor: theme?.custom?.lightMain,
            },
            {
                id: "revenue",
                label: "Ventas totales",
                value: `$ ${current.totalRevenue.toLocaleString("es-AR")}`,
                deltaPct: deltaPct(current.totalRevenue, previous.totalRevenue),
                comparisonLabel,
                icon: <AttachMoneyOutlinedIcon fontSize="small" />,
                iconColor: theme?.custom?.lightMain,
            },
            {
                id: "activeDays",
                label: "Días con ventas",
                value: String(current.activeDays),
                deltaPct: deltaPct(current.activeDays, previous.activeDays),
                comparisonLabel,
                icon: <CalendarMonthOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.secondary?.main,
            },
            {
                id: "avgTicket",
                label: "Ticket promedio",
                value: `$ ${Math.round(currentAvgTicket).toLocaleString("es-AR")}`,
                deltaPct: deltaPct(currentAvgTicket, previousAvgTicket),
                comparisonLabel,
                icon: <ShoppingCartOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.secondary?.main,
            },
        ],
        dailySales: current.dailyBuckets.map((b) => ({ date: formatDayLabel(b.date), units: b.units })),
        stockEvolution: buildStockEvolution(current.dailyBuckets, currentStock),
        topSellingDays: getTopSellingDays(current.dailyBuckets),
        periodSummary: [
            {
                label: "Máximo diario",
                value: maxDay ? `${maxDay.units} unidades` : "—",
                subValue: maxDay ? formatDayLabel(maxDay.date) : undefined,
                icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Mínimo diario",
                value: minDay ? `${minDay.units} unidades` : "—",
                subValue: minDay ? formatDayLabel(minDay.date) : undefined,
                icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Promedio diario",
                value: `${avgUnits} unidades`,
                subValue: `${current.activeDays} días con ventas`,
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
        ],
    };
};