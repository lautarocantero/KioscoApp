import { Box, Button, Skeleton, Typography, useTheme, type Theme } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import ReceiptIcon from "@mui/icons-material/Receipt";
import type { ShopSalesChartProps } from "@typings/shop/shopComponentTypes";
import { formatCurrency } from "../../cart/helpers/formatCurrency";
import ShopSalesChartTooltip from "./ShopSalesChartTooltip";

const ShopSalesChart = ({ dailySales, weekTotal, isLoading, error }: ShopSalesChartProps): React.ReactNode => {
    const theme = useTheme();

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
            })}
        >
            <Box sx={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", flexWrap: "wrap", gap: 1.5, mb: 1.5 }}>
                <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                        Ventas
                    </Typography>
                    <Typography variant="caption" sx={(t: Theme) => ({ color: t.custom.darkWhite })}>
                        Últimos 7 días
                    </Typography>
                    {isLoading ? (
                        <Skeleton variant="text" width={120} height={32} />
                    ) : (
                        <Typography variant="h6" sx={{ fontWeight: 700, mt: 0.5 }}>
                            {formatCurrency(weekTotal)}
                        </Typography>
                    )}
                </Box>

                <Button
                    component={RouterLink}
                    to="/receipts"
                    variant="outlined"
                    size="small"
                    startIcon={<ReceiptIcon />}
                >
                    Cargar boleta
                </Button>
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
