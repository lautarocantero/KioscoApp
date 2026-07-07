import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import type { PresentationAnalyticsData, PresentationAnalyticsRaw } from "@typings/ui/analytics.types";

const currencyFmt = new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "ARS",
    maximumFractionDigits: 0,
});

const formatRangeLabel = (start: string, end: string): string => {
    const fmt = (iso: string) =>
        new Intl.DateTimeFormat("es-AR", { day: "2-digit", month: "short", year: "numeric" })
            .format(new Date(`${iso}T00:00:00`))
            .replace(".", "");
    return `${fmt(start)} - ${fmt(end)}`;
};

export function mapPresentationAnalytics(
    raw: PresentationAnalyticsRaw,
    subtitle: string,
): PresentationAnalyticsData {
    const { totals, deltas, dailySales, weeklySales, topSellingDays, periodSummary, range } = raw;

    return {
        title: "Ventas de la presentación",
        subtitle,
        dateRangeLabel: formatRangeLabel(range.start, range.end),
        kpis: [
            {
                id: "units",
                label: "Unidades vendidas",
                value: totals.units.toLocaleString("es-AR"),
                deltaPct: deltas.unitsPct ?? 0,
                comparisonLabel: "vs período anterior",
                icon: <AddCircleOutlineIcon fontSize="small" />,
                iconColor: "#A78BFA",
            },
            {
                id: "revenue",
                label: "Ventas totales",
                value: currencyFmt.format(totals.revenue),
                deltaPct: deltas.revenuePct ?? 0,
                comparisonLabel: "vs período anterior",
                icon: <AttachMoneyOutlinedIcon fontSize="small" />,
                iconColor: "#A78BFA",
            },
            {
                id: "activeDays",
                label: "Días con ventas",
                value: String(totals.activeDays),
                deltaPct: deltas.activeDaysPct ?? 0,
                comparisonLabel: "vs período anterior",
                icon: <CalendarMonthOutlinedIcon fontSize="small" />,
                iconColor: "#4ADE80",
            },
            {
                id: "avgTicket",
                label: "Ticket promedio",
                value: currencyFmt.format(totals.avgTicket),
                deltaPct: deltas.avgTicketPct ?? 0,
                comparisonLabel: "vs período anterior",
                icon: <ShoppingCartOutlinedIcon fontSize="small" />,
                iconColor: "#4ADE80",
            },
        ],
        dailySales: dailySales.map((d) => ({ date: d.date, units: d.units })),
        weeklySales: weeklySales.map((w) => ({ weekLabel: w.weekLabel, units: w.units })),
        topSellingDays: topSellingDays.map((d) => ({ date: d.date, units: d.units })),
        periodSummary: [
            {
                label: "Máximo diario",
                value: `${periodSummary.maxDaily?.units ?? 0} unidades`,
                subValue: periodSummary.maxDaily?.date ?? "-",
                icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
            {
                label: "Mínimo diario",
                value: `${periodSummary.minDaily?.units ?? 0} unidades`,
                subValue: periodSummary.minDaily?.date ?? "-",
                icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
            {
                label: "Promedio diario",
                value: `${Math.round(periodSummary.avgDailyUnits)} unidades`,
                subValue: `${periodSummary.activeDaysCount} días con ventas`,
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
        ],
    };
}