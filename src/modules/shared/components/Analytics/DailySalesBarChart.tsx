import { Box, Typography, useTheme, type Theme } from "@mui/material";
import type { DailySalesBarChartProps } from "@typings/ui/analytics.types";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import CustomTooltip from "./CustomToolTip";
import { getChartTitle } from "./AnalyticsHelper";


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
                            tick={{ fill: theme.custom.fontColor, fontSize: 11 }}
                            axisLine={{ stroke: theme.palette.primary.main }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: theme.custom.fontColor, fontSize: 11 }}
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