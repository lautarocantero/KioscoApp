import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import AttachMoneyOutlinedIcon from "@mui/icons-material/AttachMoneyOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import ArrowCircleUpOutlinedIcon from "@mui/icons-material/ArrowCircleUpOutlined";
import ArrowCircleDownOutlinedIcon from "@mui/icons-material/ArrowCircleDownOutlined";
import TrendingUpOutlinedIcon from "@mui/icons-material/TrendingUpOutlined";
import type { PresentationAnalyticsData } from "@typings/ui/analytics.types";

const dailySales = [
    { date: "01 may", units: 32 }, { date: "02 may", units: 41 }, { date: "03 may", units: 38 },
    { date: "04 may", units: 45 }, { date: "05 may", units: 64 }, { date: "06 may", units: 40 },
    { date: "07 may", units: 36 }, { date: "08 may", units: 42 }, { date: "09 may", units: 48 },
    { date: "10 may", units: 44 }, { date: "11 may", units: 78 }, { date: "12 may", units: 39 },
    { date: "13 may", units: 35 }, { date: "14 may", units: 41 }, { date: "15 may", units: 46 },
    { date: "16 may", units: 43 }, { date: "17 may", units: 37 }, { date: "18 may", units: 68 },
    { date: "19 may", units: 42 }, { date: "20 may", units: 45 }, { date: "21 may", units: 40 },
    { date: "22 may", units: 38 }, { date: "23 may", units: 89 }, { date: "24 may", units: 46 },
    { date: "25 may", units: 41 }, { date: "26 may", units: 44 }, { date: "27 may", units: 39 },
    { date: "28 may", units: 43 }, { date: "29 may", units: 40 }, { date: "30 may", units: 72 },
    { date: "31 may", units: 45 },
];

const weeklySales = [
    { weekLabel: "29 abr - 05 may", units: 120 },
    { weekLabel: "06 may - 12 may", units: 210 },
    { weekLabel: "13 may - 19 may", units: 270 },
    { weekLabel: "20 may - 26 may", units: 190 },
    { weekLabel: "27 may - 31 may", units: 240 },
];

const topSellingDays = [
    { date: "23 may", units: 89 },
    { date: "11 may", units: 78 },
    { date: "30 may", units: 72 },
    { date: "18 may", units: 68 },
    { date: "05 may", units: 64 },
];

export const mockPresentationAnalytics: PresentationAnalyticsData = {
    title: "Ventas de la presentación",
    subtitle: "500ml Lata",
    dateRangeLabel: "01 may 2024 - 31 may 2024",
    kpis: [
        {
            id: "units",
            label: "Unidades vendidas",
            value: "1.248",
            deltaPct: 18.6,
            comparisonLabel: "vs 01 abr - 30 abr",
            icon: <AddCircleOutlineIcon fontSize="small" />,
            iconColor: "#A78BFA",
        },
        {
            id: "revenue",
            label: "Ventas totales",
            value: "$ 1.872.000",
            deltaPct: 22.4,
            comparisonLabel: "vs 01 abr - 30 abr",
            icon: <AttachMoneyOutlinedIcon fontSize="small" />,
            iconColor: "#A78BFA",
        },
        {
            id: "activeDays",
            label: "Días con ventas",
            value: "26",
            deltaPct: 8.3,
            comparisonLabel: "vs 01 abr - 30 abr",
            icon: <CalendarMonthOutlinedIcon fontSize="small" />,
            iconColor: "#4ADE80",
        },
        {
            id: "avgTicket",
            label: "Ticket promedio",
            value: "$ 1.500",
            deltaPct: 4.7,
            comparisonLabel: "vs 01 abr - 30 abr",
            icon: <ShoppingCartOutlinedIcon fontSize="small" />,
            iconColor: "#4ADE80",
        },
    ],
    dailySales,
    weeklySales,
    topSellingDays,
    // salesByChannel,
    // totalUnitsLabel: "1.248\nUnidades",
    periodSummary: [
        {
            label: "Máximo diario",
            value: "89 unidades",
            subValue: "23 de mayo",
            icon: <ArrowCircleUpOutlinedIcon fontSize="small" />,
            iconColor: "#8B5CF6",
        },
        {
            label: "Mínimo diario",
            value: "12 unidades",
            subValue: "02 de mayo",
            icon: <ArrowCircleDownOutlinedIcon fontSize="small" />,
            iconColor: "#8B5CF6",
        },
        {
            label: "Promedio diario",
            value: "40 unidades",
            subValue: "26 días con ventas",
            icon: <TrendingUpOutlinedIcon fontSize="small" />,
            iconColor: "#8B5CF6",
        },
    ],
};