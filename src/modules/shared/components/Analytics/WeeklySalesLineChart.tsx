import { useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import NoisyCard from "../Cards/NoisyCard";
import type { WeeklySalesPoint } from "@typings/ui/analytics.types";

interface WeeklySalesLineChartProps {
    data: WeeklySalesPoint[];
    granularityOptions?: string[];
    defaultGranularity?: string;
    onGranularityChange?: (value: string) => void;
}

const CustomTooltip = ({ active, payload, label }: any): React.ReactNode => {
    if (!active || !payload?.length) return null;
    return (
        <Box
            sx={{
                bgcolor: "rgba(20,20,28,0.95)",
                border: "1px solid rgba(139,92,246,0.4)",
                borderRadius: "8px",
                px: 1.5,
                py: 1,
            }}
        >
            <Typography variant="caption" sx={{ display: "block", color: "text.secondary" }}>
                {label}
            </Typography>
            <Typography variant="caption" sx={{ fontWeight: 700 }}>
                {payload[0].value} unidades
            </Typography>
        </Box>
    );
};

const WeeklySalesLineChart = ({
    data,
    granularityOptions = ["Semana", "Mes"],
    defaultGranularity = "Semana",
    onGranularityChange,
}: WeeklySalesLineChartProps): React.ReactNode => {
    const [granularity, setGranularity] = useState(defaultGranularity);

    return (
        <NoisyCard sx={{ p: 2.5, height: "100%" }}>
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Unidades vendidas por semana
                </Typography>
                <Select
                    size="small"
                    value={granularity}
                    onChange={(e) => {
                        setGranularity(e.target.value);
                        onGranularityChange?.(e.target.value);
                    }}
                    sx={{
                        fontSize: "0.8rem",
                        height: 32,
                        minWidth: 100,
                        bgcolor: "rgba(255,255,255,0.04)",
                        "& .MuiOutlinedInput-notchedOutline": { borderColor: "rgba(255,255,255,0.1)" },
                    }}
                >
                    {granularityOptions.map((opt) => (
                        <MenuItem key={opt} value={opt}>
                            {opt}
                        </MenuItem>
                    ))}
                </Select>
            </Box>

            <Box sx={{ width: "100%", height: 220 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                        <defs>
                            <linearGradient id="weeklySalesFill" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="0%" stopColor="#8B5CF6" stopOpacity={0.35} />
                                <stop offset="100%" stopColor="#8B5CF6" stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="weekLabel"
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 10 }}
                            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ stroke: "#8B5CF6", strokeWidth: 1 }} />
                        <Area
                            type="monotone"
                            dataKey="units"
                            stroke="#A78BFA"
                            strokeWidth={2}
                            fill="url(#weeklySalesFill)"
                            dot={{ r: 4, fill: "#A78BFA", strokeWidth: 0 }}
                            activeDot={{ r: 5 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </Box>
        </NoisyCard>
    );
};

export default WeeklySalesLineChart;