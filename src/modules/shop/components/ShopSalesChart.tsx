import { Box, MenuItem, Select, Skeleton, Tooltip as MuiTooltip, Typography, useTheme, type Theme, type SelectChangeEvent } from "@mui/material";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { useTranslation } from "react-i18next";
import type { ShopSalesChartProps } from "@typings/shop/shopComponentTypes";
import { ShopSalesRange } from "@typings/shop/shopEnums";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import ShopSalesChartTooltip from "./ShopSalesChartTooltip";

const RANGE_OPTIONS = Object.values(ShopSalesRange);

const ShopSalesChart = ({ dailySales, periodTotal, range, setRange, canChangeRange, isLoading, error }: ShopSalesChartProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    const handleRangeChange = (event: SelectChangeEvent): void => {
        setRange(event.target.value as ShopSalesRange);
    };

    return (
        <Box
            sx={(theme: Theme) => ({
                p: 2.5,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.background,
                height: "100%",
                display: "flex",
                flexDirection: "column",
                minWidth: 0,
            })}
        >
            <Box
                sx={{
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "stretch", sm: "flex-start" },
                    justifyContent: "space-between",
                    gap: 1.5,
                    mb: 1.5,
                }}
            >
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        {t("shop.salesChart.title")}
                    </Typography>
                    {isLoading ? (
                        <Skeleton variant="text" width={120} height={32} />
                    ) : (
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {formatCurrency(periodTotal)}
                        </Typography>
                    )}
                </Box>

                <MuiTooltip title={canChangeRange ? "" : t("permissions.adminOnly")}>
                    <span>
                        <Select
                            value={range}
                            onChange={handleRangeChange}
                            size="small"
                            disabled={!canChangeRange}
                            aria-label={t("shop.salesChart.rangeAriaLabel")}
                            sx={{ alignSelf: { xs: "flex-start", sm: "center" }, minWidth: 160 }}
                        >
                            {RANGE_OPTIONS.map((option) => (
                                <MenuItem key={option} value={option}>
                                    {t(`shopSalesRange.${option}`)}
                                </MenuItem>
                            ))}
                        </Select>
                    </span>
                </MuiTooltip>
            </Box>

            {error && (
                <Typography variant="body2" color="error" sx={{ mb: 1 }}>
                    {error}
                </Typography>
            )}

            <Box sx={{ width: "100%", flex: 1, minHeight: 180 }}>
                {isLoading ? (
                    <Skeleton variant="rounded" width="100%" height="100%" />
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={dailySales} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke={theme.custom.white} />
                            <XAxis
                                dataKey="label"
                                tick={{ fill: theme.custom.fontColor, fontSize: 11 }}
                                axisLine={{ stroke: theme.palette.primary.main }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: theme.custom.fontColor, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip content={ShopSalesChartTooltip} cursor={{ fill: theme.custom.darkGray }} />
                            <Bar dataKey="total" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} maxBarSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </Box>
    );
};

export default ShopSalesChart;
