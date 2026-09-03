import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import type { ShopDailyHeroCardProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import { formatSellsKpiVariation } from "../../sells/helpers/formatSellsKpiVariation";
import { formatSellsPeakHourRatio } from "../../sells/helpers/formatSellsPeakHourRatio";
import NoisyCard from "../../shared/components/Cards/NoisyCard";
import ShopSalesChartTooltip from "./ShopSalesChartTooltip";

const EMPTY_VALUE = "—";

const ShopDailyHeroCard = ({ kpis, partialsAlert, hourly, peakHour, hasSellsToday, isLoading, error }: ShopDailyHeroCardProps): React.ReactNode => {
    const { t } = useTranslation();
    const theme = useTheme();

    if (error) {
        return (
            <NoisyCard sx={{ p: 3 }}>
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark })}>
                    {error}
                </Typography>
            </NoisyCard>
        );
    }

    if (isLoading) {
        return (
            <NoisyCard sx={{ p: 3 }}>
                <Skeleton variant="text" width={160} height={24} />
                <Skeleton variant="text" width={220} height={56} sx={{ mt: 1 }} />
                <Skeleton variant="rounded" width="100%" height={100} sx={{ mt: 3 }} />
            </NoisyCard>
        );
    }

    const sales = formatSellsKpiVariation(kpis.sales);
    const ticketsCount = formatSellsKpiVariation(kpis.ticketsCount);
    const averageTicket = formatSellsKpiVariation(kpis.averageTicket);

    return (
        <NoisyCard sx={{ p: 3, display: "flex", flexDirection: "column", gap: 2.5 }}>
            <Box sx={{ display: "flex", flexWrap: "wrap", gap: 3, justifyContent: "space-between" }}>
                <Box>
                    <Typography
                        variant="caption"
                        sx={(theme: Theme) => ({
                            fontWeight: 600,
                            letterSpacing: "0.06em",
                            textTransform: "uppercase",
                            color: theme.palette.primary.main,
                        })}
                    >
                        {t("shop.hero.title")}
                    </Typography>
                    <Typography variant="h3" sx={{ fontWeight: 700, lineHeight: 1, mt: 1 }}>
                        {hasSellsToday ? formatCurrency(kpis.sales.value) : EMPTY_VALUE}
                    </Typography>
                    {hasSellsToday && (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1.25, mt: 1.25 }}>
                            <Typography
                                component="span"
                                sx={(theme: Theme) => ({
                                    px: 1,
                                    py: 0.25,
                                    borderRadius: "999px",
                                    fontSize: "0.68rem",
                                    fontWeight: 700,
                                    letterSpacing: "0.04em",
                                    textTransform: "uppercase",
                                    bgcolor: sales.tone === "positive" ? theme.custom.lightSecondary : theme.custom.lightGray,
                                    color: sales.tone === "positive" ? theme.custom.darkSecondary : theme.custom.darkWhite,
                                })}
                            >
                                {sales.label}
                            </Typography>
                            <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                                {t("shop.hero.vsYesterday", { amount: formatCurrency(kpis.sales.previousValue) })}
                            </Typography>
                        </Box>
                    )}
                </Box>

                <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
                    <Box>
                        <Typography
                            variant="caption"
                            sx={(theme: Theme) => ({ fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: theme.palette.primary.main })}
                        >
                            {t("shop.hero.tickets.label")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {hasSellsToday ? kpis.ticketsCount.value : EMPTY_VALUE}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {hasSellsToday ? ticketsCount.label : EMPTY_VALUE}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="caption"
                            sx={(theme: Theme) => ({ fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: theme.palette.primary.main })}
                        >
                            {t("shop.hero.averageTicket.label")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {hasSellsToday ? formatCurrency(kpis.averageTicket.value) : EMPTY_VALUE}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {hasSellsToday ? averageTicket.label : EMPTY_VALUE}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="caption"
                            sx={(theme: Theme) => ({ fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: theme.custom.accents.gold })}
                        >
                            {t("shop.hero.toCollect.label")}
                        </Typography>
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {formatCurrency(partialsAlert.totalAmount)}
                        </Typography>
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("shop.hero.toCollect.note", { count: partialsAlert.count })}
                        </Typography>
                    </Box>
                </Box>
            </Box>

            {!hasSellsToday && (
                <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {t("shop.hero.empty")}
                </Typography>
            )}

            <Box sx={{ pt: 2, borderTop: `1px solid ${theme.custom.darkGray}` }}>
                <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: 1.5, mb: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {t("shop.hourlyChart.title")}
                    </Typography>
                    {peakHour && (
                        <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                            {t("shop.hourlyChart.peak", {
                                start: peakHour.startHour,
                                end: peakHour.endHour,
                                ratio: formatSellsPeakHourRatio(peakHour.ticketSharePct),
                            })}
                        </Typography>
                    )}
                </Box>

                <Box sx={{ width: "100%", height: 150 }}>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={hourly} margin={{ top: 4, right: 0, left: -28, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke={theme.custom.white} />
                            <XAxis
                                dataKey="label"
                                tick={{ fill: theme.custom.fontColor, fontSize: 11 }}
                                axisLine={{ stroke: theme.custom.darkGray }}
                                tickLine={false}
                            />
                            <YAxis tick={{ fill: theme.custom.fontColor, fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={ShopSalesChartTooltip} cursor={{ fill: theme.custom.darkGray }} />
                            <Bar dataKey="total" fill={theme.palette.primary.main} radius={[3, 3, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </Box>
            </Box>
        </NoisyCard>
    );
};

export default ShopDailyHeroCard;
