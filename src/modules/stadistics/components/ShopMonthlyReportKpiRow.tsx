import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportKpiRowProps } from "@typings/stadistics/stadisticsComponentTypes";
import { ReportCompareWith } from "@typings/stadistics/stadisticsEnums";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { calculateVariationPct } from "../helpers/calculateVariationPct";
import { formatPercentageChange } from "../helpers/formatPercentageChange";
import ShopMonthlyReportVariationChip from "./ShopMonthlyReportVariationChip";

const KPI_CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
});

const ShopMonthlyReportKpiRow = ({
    summary,
    compareWith,
    comparisonMonthLabel,
    isLoading,
    error,
}: ShopMonthlyReportKpiRowProps): React.ReactNode => {
    const { t } = useTranslation();

    if (error) {
        return (
            <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                {error}
            </Typography>
        );
    }

    if (isLoading || !summary) {
        return (
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
                {[0, 1, 2].map((key) => (
                    <Skeleton key={key} variant="rounded" height={96} />
                ))}
            </Box>
        );
    }

    const showComparison = compareWith !== ReportCompareWith.None && summary.previous !== null;
    const salesPct = showComparison ? calculateVariationPct(summary.totalRevenue, summary.previous!.totalRevenue) : null;
    const ticketPct = showComparison ? calculateVariationPct(summary.totalSales, summary.previous!.totalSales) : null;
    const averageTicketPct = showComparison ? calculateVariationPct(summary.averageTicket, summary.previous!.averageTicket) : null;

    const cards = [
        {
            key: "totalSales",
            label: t("stadistics.monthlyReport.kpis.totalSales"),
            value: formatCurrency(summary.totalRevenue),
            pct: salesPct,
            previousLabel: comparisonMonthLabel && summary.previous
                ? t("stadistics.monthlyReport.kpis.previousAmount", { month: comparisonMonthLabel, amount: formatCurrency(summary.previous.totalRevenue) })
                : null,
        },
        {
            key: "tickets",
            label: t("stadistics.monthlyReport.kpis.tickets"),
            value: summary.totalSales.toLocaleString("es-AR"),
            pct: ticketPct,
            previousLabel: t("stadistics.monthlyReport.kpis.perDay", { count: Math.round(summary.ticketsPerDay) }),
        },
        {
            key: "averageTicket",
            label: t("stadistics.monthlyReport.kpis.averageTicket"),
            value: formatCurrency(summary.averageTicket),
            pct: averageTicketPct,
            previousLabel: comparisonMonthLabel && summary.previous
                ? t("stadistics.monthlyReport.kpis.previousAmount", { month: comparisonMonthLabel, amount: formatCurrency(summary.previous.averageTicket) })
                : null,
        },
    ];

    return (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, gap: 2 }}>
            {cards.map((card) => (
                <Box key={card.key} sx={KPI_CARD_SX}>
                    <Typography
                        sx={(theme: Theme) => ({
                            fontSize: "0.72rem",
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: theme.palette.primary.light,
                        })}
                    >
                        {card.label}
                    </Typography>
                    <Typography
                        sx={(theme: Theme) => ({ fontSize: "1.75rem", fontWeight: 700, color: theme.custom.fontColor, my: 1 })}
                    >
                        {card.value}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                        {card.pct !== null && (
                            <ShopMonthlyReportVariationChip {...formatPercentageChange(card.pct)} />
                        )}
                        {card.previousLabel && (
                            <Typography sx={(theme: Theme) => ({ fontSize: "0.72rem", color: theme.custom.darkWhite })}>
                                {card.previousLabel}
                            </Typography>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default ShopMonthlyReportKpiRow;
