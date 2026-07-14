import { Box, Typography, useTheme, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import NoisyCard from "../Cards/NoisyCard";
import type { StockEvolutionChartProps } from "@typings/ui/analytics.types";
import CustomTooltip from "./CustomToolTip";

const StockEvolutionChart = ({ data, isLoading }: StockEvolutionChartProps): React.ReactNode => {
    const theme = useTheme();
    const hasData = data && data.length > 0;

    return (
        <NoisyCard sx={{ p: 2.5, height: "100%" }}>
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 2,
                }}
            >
                <Typography
                    variant="subtitle1"
                    sx={(theme: Theme) => ({
                        fontWeight: 600,
                        color: theme?.custom?.fontColor,
                    })}
                >
                    Evolución del stock
                </Typography>
            </Box>

            <Box sx={{ width: "100%", height: 220 }}>
                {!hasData ? (
                    <Box
                        sx={{
                            width: "100%",
                            height: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Typography
                            variant="body2"
                            sx={(theme: Theme) => ({
                                color: theme?.palette?.text?.secondary,
                                fontSize: theme?.typography?.body2?.fontSize,
                            })}
                        >
                            {isLoading
                                ? "Cargando stock..."
                                : "No hay datos de stock disponibles para este período."}
                        </Typography>
                    </Box>
                ) : (
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                            <defs>
                                <linearGradient id="stockEvolutionFill" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor={theme?.palette?.primary?.main} stopOpacity={0.35} />
                                    <stop offset="100%" stopColor={theme?.palette?.primary?.main} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid vertical={false} stroke={theme?.custom?.darkGray} />
                            <XAxis
                                dataKey="date"
                                tick={{ fill: theme?.custom?.translucidWhite, fontSize: 10 }}
                                axisLine={{ stroke: alpha(theme?.custom?.white, 0.1) }}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fill: theme?.custom?.translucidWhite, fontSize: 11 }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                content={<CustomTooltip />}
                                cursor={{ stroke: theme?.palette?.primary?.main, strokeWidth: 1 }}
                            />
                            <Area
                                type="monotone"
                                dataKey="stock"
                                stroke={theme?.custom?.lightMain}
                                strokeWidth={2}
                                fill="url(#stockEvolutionFill)"
                                dot={{ r: 4, fill: theme?.custom?.lightMain, strokeWidth: 0 }}
                                activeDot={{ r: 5 }}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                )}
            </Box>
        </NoisyCard>
    );
};

export default StockEvolutionChart;