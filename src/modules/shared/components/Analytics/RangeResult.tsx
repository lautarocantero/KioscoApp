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
import { GRAMS_PER_WEIGHT_UNIT, isWeightSaleType } from "../../helpers/saleTypeHelper";


export const mapPresentationAnalytics = ({
    raw,
    title,
    subtitle,
    currentStock,
    saleType,
    theme,
}: MapPresentationAnalyticsParams): PresentationAnalyticsData => {
    const { totals, deltas, dailySales, topSellingDays, periodSummary, range } = raw;
    const isWeight = isWeightSaleType(saleType);
    const noun = isWeight ? "gramos" : "unidades";

    // El backend cuenta "units" como bloques de venta (1 unidad = 100g cuando es weight).
    // Para mostrar/graficar gramos reales hay que multiplicar por GRAMS_PER_WEIGHT_UNIT.
    const toDisplayQty = (units: number): number => (isWeight ? units * GRAMS_PER_WEIGHT_UNIT : units);
    const fmtQty = (units: number): string =>
        `${toDisplayQty(units).toLocaleString("es-AR")}${isWeight ? "g" : ""}`;

    const comparisonLabel = "vs período anterior";

    // dailySales convertido una sola vez: se reusa para el chart y para stockEvolution,
    // así currentStock (gramos reales) y las ventas diarias quedan en la misma unidad.
    const dailySalesInDisplayUnits = dailySales.map((b) => ({ ...b, units: toDisplayQty(b.units) }));

    return {
        title,
        subtitle,
        dateRangeLabel: formatRangeLabel(range.start, range.end),
        kpis: [
            {
                id: "units",
                label: isWeight ? "Gramos vendidos" : "Unidades vendidas",
                value: fmtQty(totals.units),
                deltaPct: deltas.unitsPct ?? 0,
                comparisonLabel,
                icon: <AddCircleOutlineIcon fontSize="small" />,
                iconColor: theme?.custom?.lightMain,
            },
            {
                id: "revenue",
                label: isWeight ? "Ventas totales (por 100g)" : "Ventas totales",
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
        dailySales: dailySalesInDisplayUnits.map((b) => ({ date: formatDayLabel(b.date), units: b.units })),
        stockEvolution: buildStockEvolution(dailySalesInDisplayUnits, currentStock),
        topSellingDays: topSellingDays.map((d) => ({ date: formatDayLabel(d.date), units: toDisplayQty(d.units) })),
        periodSummary: [
            {
                label: "Máximo diario",
                value: periodSummary.maxDaily ? `${toDisplayQty(periodSummary.maxDaily.units).toLocaleString("es-AR")} ${noun}` : "—",
                subValue: periodSummary.maxDaily ? formatDayLabel(periodSummary.maxDaily.date) : undefined,
                icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Mínimo diario",
                value: periodSummary.minDaily ? `${toDisplayQty(periodSummary.minDaily.units).toLocaleString("es-AR")} ${noun}` : "—",
                subValue: periodSummary.minDaily ? formatDayLabel(periodSummary.minDaily.date) : undefined,
                icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
            {
                label: "Promedio diario",
                value: `${toDisplayQty(periodSummary.avgDailyUnits).toLocaleString("es-AR")} ${noun}`,
                subValue: `${periodSummary.activeDaysCount} días con ventas`,
                icon: <TrendingUpOutlinedIcon fontSize="small" />,
                iconColor: theme?.palette?.primary?.main,
            },
        ],
    };
};