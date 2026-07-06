// mappers/presentationAnalytics.mapper.ts
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import type { PresentationAnalyticsData } from "@typings/ui/uiModules";

interface DailyBucket {
    date: string;
    units: number;
    revenue: number;
}

interface RangeResult {
    dailyBuckets: DailyBucket[];
    totalUnits: number;
    totalRevenue: number;
    activeDays: number;
}

const formatDayLabel = (isoDate: string): string => {
    const d = new Date(isoDate);
    return d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "");
};

const formatRangeLabel = (from: Date, to: Date): string => {
    const fmt = (d: Date) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short", year: "numeric" });
    return `${fmt(from)} - ${fmt(to)}`;
};

const deltaPct = (current: number, previous: number): number => {
    if (previous === 0) return current > 0 ? 100 : 0;
    return Math.round(((current - previous) / previous) * 1000) / 10;
};

/** Agrupa los buckets diarios en ventanas de 7 días, empezando desde `from`. */
const buildWeeklyBuckets = (dailyBuckets: DailyBucket[], from: Date, to: Date) => {
    const weeks: { weekLabel: string; units: number }[] = [];
    let cursor = new Date(from);

    while (cursor <= to) {
        const weekEnd = new Date(Math.min(cursor.getTime() + 6 * 86400000, to.getTime()));
        const units = dailyBuckets
            .filter((b) => {
                const d = new Date(b.date);
                return d >= cursor && d <= weekEnd;
            })
            .reduce((sum, b) => sum + b.units, 0);

        const fmt = (d: Date) => d.toLocaleDateString("es-AR", { day: "2-digit", month: "short" }).replace(".", "");
        weeks.push({ weekLabel: `${fmt(cursor)} - ${fmt(weekEnd)}`, units });

        cursor = new Date(weekEnd.getTime() + 86400000);
    }

    return weeks;
};

export const mapPresentationAnalytics = (
    title: string,
    subtitle: string,
    from: Date,
    to: Date,
    previousFrom: Date,
    previousTo: Date,
    current: RangeResult,
    previous: RangeResult
): PresentationAnalyticsData => {
    const comparisonLabel = `vs ${formatRangeLabel(previousFrom, previousTo)}`;

    // Ticket promedio = revenue ÷ unidades (definición elegida)
    const currentAvgTicket = current.totalUnits > 0 ? current.totalRevenue / current.totalUnits : 0;
    const previousAvgTicket = previous.totalUnits > 0 ? previous.totalRevenue / previous.totalUnits : 0;

    const topSellingDays = [...current.dailyBuckets]
        .sort((a, b) => b.units - a.units)
        .slice(0, 5)
        .map((b) => ({ date: formatDayLabel(b.date), units: b.units }));

    const unitsPerDay = current.dailyBuckets.filter((b) => b.units > 0);
    const maxDay = unitsPerDay.length ? unitsPerDay.reduce((a, b) => (b.units > a.units ? b : a)) : null;
    const minDay = unitsPerDay.length ? unitsPerDay.reduce((a, b) => (b.units < a.units ? b : a)) : null;
    const avgUnits = unitsPerDay.length
        ? Math.round(unitsPerDay.reduce((sum, b) => sum + b.units, 0) / unitsPerDay.length)
        : 0;

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
                iconColor: "#A78BFA",
            },
            {
                id: "revenue",
                label: "Ventas totales",
                value: `$ ${current.totalRevenue.toLocaleString("es-AR")}`,
                deltaPct: deltaPct(current.totalRevenue, previous.totalRevenue),
                comparisonLabel,
                icon: <AttachMoneyOutlinedIcon fontSize="small" />,
                iconColor: "#A78BFA",
            },
            {
                id: "activeDays",
                label: "Días con ventas",
                value: String(current.activeDays),
                deltaPct: deltaPct(current.activeDays, previous.activeDays),
                comparisonLabel,
                icon: <CalendarMonthOutlinedIcon fontSize="small" />,
                iconColor: "#4ADE80",
            },
            {
                id: "avgTicket",
                label: "Ticket promedio",
                value: `$ ${Math.round(currentAvgTicket).toLocaleString("es-AR")}`,
                deltaPct: deltaPct(currentAvgTicket, previousAvgTicket),
                comparisonLabel,
                icon: <ShoppingCartOutlinedIcon fontSize="small" />,
                iconColor: "#4ADE80",
            },
        ],
        dailySales: current.dailyBuckets.map((b) => ({ date: formatDayLabel(b.date), units: b.units })),
        weeklySales: buildWeeklyBuckets(current.dailyBuckets, from, to),
        topSellingDays,
        periodSummary: [
            {
                label: "Máximo diario",
                value: maxDay ? `${maxDay.units} unidades` : "—",
                subValue: maxDay ? formatDayLabel(maxDay.date) : undefined,
                icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
            {
                label: "Mínimo diario",
                value: minDay ? `${minDay.units} unidades` : "—",
                subValue: minDay ? formatDayLabel(minDay.date) : undefined,
                icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
            {
                label: "Promedio diario",
                value: `${avgUnits} unidades`,
                subValue: `${current.activeDays} días con ventas`,
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                iconColor: "#8B5CF6",
            },
        ],
    };
};