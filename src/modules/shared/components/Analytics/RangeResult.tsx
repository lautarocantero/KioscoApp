// modules/shared/components/Analytics/RangeResult.tsx
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import type { MapPresentationAnalyticsParams, PresentationAnalyticsData } from "@typings/shared/types/useAnalytics.types";
import { formatDayLabel, formatRangeLabel, buildStockEvolution } from "./AnalyticsHelper";


export const mapPresentationAnalytics = ({
    raw,
    title,
    subtitle,
    currentStock,
    theme,
}: MapPresentationAnalyticsParams): PresentationAnalyticsData => {
    const { totals, deltas, dailySales, topSellingDays, periodSummary, range } = raw;

    // ⚠️ El backend todavía no manda el rango anterior (`previousRange`), así que
    // no podemos mostrar sus fechas exactas. Si en algún momento el endpoint lo
    // agrega a `range`, reemplazar esta comparisonLabel por
    // `vs ${formatRangeLabel(previousRange.start, previousRange.end)}`.
    const comparisonLabel = "vs período anterior";

    return {
        title,
        subtitle,
        dateRangeLabel: formatRangeLabel(range.start, range.end),
        kpis: [
            {
                id: "units",
                label: "Unidades vendidas",
                value: totals.units.toLocaleString("es-AR"),
                deltaPct: deltas.unitsPct ?? 0,
                comparisonLabel,
                icon: <AddCircleOutlineIcon fontSize="small" />,
                iconColor: theme?.custom?.lightMain,
            },
            {
                id: "revenue",
                label: "Ventas totales",
                value: `$ ${totals.revenue.toLocaleString("es-AR")}`,
                deltaPct: deltas.revenuePct ?? 0,
                comparisonLabel,
                icon: <AttachMoneyOutlinedIcon fontSize="small" />,
                iconColor: theme?.custom?.lightMain,
            },
            {
                id: "activeDays",
                label: "Días con ventas",
                value: String(totals.activeDays),
                deltaPct: deltas.activeDaysPct ?? 0,
                comparisonLabel,
                icon: <CalendarMonthOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.secondary?.main,
            },
            {
                id: "avgTicket",
                label: "Ticket promedio",
                value: `$ ${Math.round(totals.avgTicket).toLocaleString("es-AR")}`,
                deltaPct: deltas.avgTicketPct ?? 0,
                comparisonLabel,
                icon: <ShoppingCartOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.secondary?.main,
            },
        ],
        dailySales: dailySales.map((b) => ({ date: formatDayLabel(b.date), units: b.units })),
        stockEvolution: buildStockEvolution(dailySales, currentStock),
        topSellingDays: topSellingDays.map((d) => ({ date: formatDayLabel(d.date), units: d.units })),
        periodSummary: [
            {
                label: "Máximo diario",
                value: periodSummary.maxDaily ? `${periodSummary.maxDaily.units} unidades` : "—",
                subValue: periodSummary.maxDaily ? formatDayLabel(periodSummary.maxDaily.date) : undefined,
                icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Mínimo diario",
                value: periodSummary.minDaily ? `${periodSummary.minDaily.units} unidades` : "—",
                subValue: periodSummary.minDaily ? formatDayLabel(periodSummary.minDaily.date) : undefined,
                icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Promedio diario",
                value: `${periodSummary.avgDailyUnits} unidades`,
                subValue: `${periodSummary.activeDaysCount} días con ventas`,
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
        ],
    };
};
