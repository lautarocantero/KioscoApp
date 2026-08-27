import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportDailyChartProps } from "@typings/stadistics/stadisticsComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import ShopMonthlyReportDailyChartDot from "./ShopMonthlyReportDailyChartDot";
import ShopMonthlyReportDailyChartTooltip from "./ShopMonthlyReportDailyChartTooltip";

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
});

const LEGEND_SWATCH_SX = (color: string) => ({
    width: 8,
    height: 8,
    borderRadius: "999px",
    bgcolor: color,
    display: "inline-block",
    mr: 0.75,
});

const ShopMonthlyReportDailyChart = ({
    dailySales,
    dailySalesSummary,
    isLoading,
    error,
}: ShopMonthlyReportDailyChartProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box sx={CARD_SX}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, flexWrap: "wrap", mb: 2 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t("stadistics.monthlyReport.dailyChart.title")}
                    </Typography>
                    {!isLoading && dailySalesSummary && (
                        <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 0.5 })}>
                            {t("stadistics.monthlyReport.dailyChart.subtitle", {
                                avgPerDay: formatCurrency(dailySalesSummary.avgPerDay),
                                count: dailySalesSummary.closedDays,
                            })}
                        </Typography>
                    )}
                </Box>
                <Box sx={{ display: "flex", gap: 2, alignItems: "center", fontSize: "0.72rem" }}>
                    <Typography component="span" sx={(t: Theme) => ({ fontSize: "0.72rem", color: t.custom.darkWhite })}>
                        <Box component="span" sx={LEGEND_SWATCH_SX(theme.palette.primary.main)} />
                        {t("stadistics.monthlyReport.dailyChart.legendRegular")}
                    </Typography>
                    <Typography component="span" sx={(t: Theme) => ({ fontSize: "0.72rem", color: t.custom.darkWhite })}>
                        <Box component="span" sx={LEGEND_SWATCH_SX(theme.palette.secondary.main)} />
                        {t("stadistics.monthlyReport.dailyChart.legendBest")}
                    </Typography>
                </Box>
            </Box>

            {error && (
                <Typography role="alert" sx={(t: Theme) => ({ color: t.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            <Box sx={{ width: "100%", height: 180 }}>
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={dailySales} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke={theme.custom.white} />
                            <XAxis
                                dataKey="label"
                                tick={{ fill: theme.custom.darkWhite, fontSize: 11 }}
                                axisLine={{ stroke: theme.palette.primary.main }}
                                tickLine={false}
                                interval={4}
                            />
                            <YAxis tick={{ fill: theme.custom.darkWhite, fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={ShopMonthlyReportDailyChartTooltip} cursor={{ stroke: theme.custom.darkGray }} />
                            <Line
                                type="linear"
                                dataKey="amount"
                                stroke={theme.palette.primary.main}
                                strokeWidth={2}
                                dot={ShopMonthlyReportDailyChartDot}
                                activeDot={{ r: 5, fill: theme.palette.secondary.main }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Box>

            {!isLoading && dailySalesSummary && (
                <Box sx={{ display: "flex", gap: 4.5, mt: 2, flexWrap: "wrap" }}>
                    {dailySalesSummary.bestDay && (
                        <Box>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.72rem", color: t.custom.darkWhite })}>
                                {t("stadistics.monthlyReport.dailyChart.bestDay")}
                            </Typography>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.95rem", fontWeight: 700, mt: 0.375, color: t.palette.secondary.main })}>
                                {t("stadistics.monthlyReport.dailyChart.dayAmount", {
                                    day: dailySalesSummary.bestDay.label,
                                    amount: formatCurrency(dailySalesSummary.bestDay.amount),
                                })}
                            </Typography>
                        </Box>
                    )}
                    {dailySalesSummary.worstDay && (
                        <Box>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.72rem", color: t.custom.darkWhite })}>
                                {t("stadistics.monthlyReport.dailyChart.worstDay")}
                            </Typography>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.95rem", fontWeight: 700, mt: 0.375, color: t.custom.fontColor })}>
                                {t("stadistics.monthlyReport.dailyChart.dayAmount", {
                                    day: dailySalesSummary.worstDay.label,
                                    amount: formatCurrency(dailySalesSummary.worstDay.amount),
                                })}
                            </Typography>
                        </Box>
                    )}
                    {dailySalesSummary.bestWeek && (
                        <Box>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.72rem", color: t.custom.darkWhite })}>
                                {t("stadistics.monthlyReport.dailyChart.bestWeek")}
                            </Typography>
                            <Typography sx={(t: Theme) => ({ fontSize: "0.95rem", fontWeight: 700, mt: 0.375, color: t.custom.fontColor })}>
                                {t("stadistics.monthlyReport.dailyChart.weekAmount", {
                                    week: dailySalesSummary.bestWeek.label,
                                    amount: formatCurrency(dailySalesSummary.bestWeek.amount),
                                })}
                            </Typography>
                        </Box>
                    )}
                </Box>
            )}
        </Box>
    );
};

export default ShopMonthlyReportDailyChart;
