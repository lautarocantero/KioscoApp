import { Box, Typography, useTheme, type Theme } from "@mui/material";
import type { DailySalesBarChartProps } from "@typings/ui/analytics.types";
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
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
                    <LineChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
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
                        <Tooltip content={<CustomTooltip theme={theme} />} cursor={{ stroke: theme.custom.darkGray }} />
                        <Line
                            type="linear"
                            dataKey="units"
                            stroke={theme.palette.primary.main}
                            strokeWidth={2}
                            dot={{ r: 2.5, fill: theme.palette.primary.main, strokeWidth: 0 }}
                            activeDot={{ r: 5 }}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DailySalesBarChart;