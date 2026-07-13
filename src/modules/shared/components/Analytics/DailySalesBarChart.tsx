import { Box, Typography, useTheme, type Theme } from "@mui/material";
import type { DailySalesBarChartProps } from "@typings/ui/analytics.types";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";


const CustomTooltip = ({ active, payload, label, theme }: any): React.ReactNode => {
    if (!active || !payload?.length) return null;
    return (
        <Box
            sx={{
                bgcolor: theme.custom.tooltipBackground,
                border: "1px solid",
                borderColor: theme.custom.accentPurpleTransparent,
                borderRadius: "8px",
                px: 1.5,
                py: 1,
            }}
        >
            <Typography variant="caption" sx={{ display: "block", color: theme.custom.mutedFontColor }}>
                {label}
            </Typography>
            <Box
                sx={{
                    mt: 0.5,
                    px: 1,
                    py: 0.25,
                    borderRadius: "6px",
                    bgcolor: theme.custom.accentPurpleSoft,
                    display: "inline-block",
                }}
            >
                <Typography variant="caption" sx={{ fontWeight: 700 }}>
                    {payload[0].value} unidades
                </Typography>
            </Box>
        </Box>
    );
};

const getChartTitle = (startDate?: string, endDate?: string): string => {
    if (!startDate || !endDate) return "Unidades vendidas";
    return `Unidades vendidas entre ${startDate} y ${endDate}`;
};

const DailySalesBarChart = ({
    data,
    startDate,
    endDate,
}: DailySalesBarChartProps): React.ReactNode => {
    const theme = useTheme();

    return (
        <Box
            sx={(theme: Theme) => ({
                p: 2.5,
                height: "100%",
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme.custom.darkGray,
                bgcolor: theme.custom.background,
            })}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    {getChartTitle(startDate, endDate)}
                </Typography>
            </Box>

            <Box sx={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke={theme.custom.white} />
                        <XAxis
                            dataKey="date"
                            interval={4}
                            tick={{ fill: theme.custom.lightMain, fontSize: 11 }}
                            axisLine={{ stroke: theme.palette.primary.main }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: theme.palette.primary.main, fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ fill: theme.custom.darkGray }} />
                        <Bar dataKey="units" fill={theme.palette.primary.main} radius={[4, 4, 0, 0]} maxBarSize={14} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DailySalesBarChart;