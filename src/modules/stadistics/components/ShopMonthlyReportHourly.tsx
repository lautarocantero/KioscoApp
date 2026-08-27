import { Box, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import type { ShopMonthlyReportHourlyProps } from "@typings/stadistics/stadisticsComponentTypes";
import ShopSalesChartTooltip from "../../shop/components/ShopSalesChartTooltip";
import ShopMonthlyReportHourlyDot from "./ShopMonthlyReportHourlyDot";

const CARD_SX = (theme: Theme) => ({
    p: 2.5,
    borderRadius: "14px",
    border: "1px solid",
    borderColor: theme.custom.darkGray,
    bgcolor: theme.custom.lightBackground,
});

const ShopMonthlyReportHourly = ({ hourlyBuckets, hourlySummary, isLoading, error }: ShopMonthlyReportHourlyProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    return (
        <Box sx={CARD_SX}>
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 2, flexWrap: "wrap", mb: 2 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t("stadistics.monthlyReport.hourly.title")}
                    </Typography>
                    <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom.darkWhite, mt: 0.375 })}>
                        {t("stadistics.monthlyReport.hourly.subtitle")}
                    </Typography>
                </Box>
                {!isLoading && hourlySummary?.peakLabel && (
                    <Box sx={{ display: "flex", gap: 1.25 }}>
                        <Box
                            component="span"
                            sx={(theme: Theme) => ({
                                display: "inline-flex", px: 1, py: 0.25, borderRadius: "999px", fontSize: "0.62rem",
                                fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                                bgcolor: alpha(theme.palette.secondary.main, 0.14), color: theme.palette.secondary.main,
                            })}
                        >
                            {t("stadistics.monthlyReport.hourly.peakChip", { range: hourlySummary.peakLabel })}
                        </Box>
                        {hourlySummary.lowLabel && (
                            <Box
                                component="span"
                                sx={(theme: Theme) => ({
                                    display: "inline-flex", px: 1, py: 0.25, borderRadius: "999px", fontSize: "0.62rem",
                                    fontWeight: 700, letterSpacing: "0.04em", textTransform: "uppercase",
                                    bgcolor: alpha(theme.custom.accents.gold, 0.2), color: theme.custom.accents.gold,
                                })}
                            >
                                {t("stadistics.monthlyReport.hourly.lowChip", { range: hourlySummary.lowLabel })}
                            </Box>
                        )}
                    </Box>
                )}
            </Box>

            {error && (
                <Typography role="alert" sx={(theme: Theme) => ({ color: theme.custom.errorDark, mb: 1 })}>
                    {error}
                </Typography>
            )}

            <Box sx={{ width: "100%", height: 180 }}>
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={hourlyBuckets} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke={theme.custom.white} />
                            <XAxis
                                dataKey="label"
                                tick={{ fill: theme.custom.darkWhite, fontSize: 11 }}
                                axisLine={{ stroke: theme.palette.primary.main }}
                                tickLine={false}
                            />
                            <YAxis tick={{ fill: theme.custom.darkWhite, fontSize: 11 }} axisLine={false} tickLine={false} />
                            <Tooltip content={ShopSalesChartTooltip} cursor={{ stroke: theme.custom.darkGray }} />
                            <Line
                                type="linear"
                                dataKey="amount"
                                stroke={theme.palette.primary.main}
                                strokeWidth={2}
                                dot={ShopMonthlyReportHourlyDot}
                                activeDot={{ r: 5, fill: theme.palette.secondary.main }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Box>
    );
};

export default ShopMonthlyReportHourly;
