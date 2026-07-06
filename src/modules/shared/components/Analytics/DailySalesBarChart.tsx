import { useState } from "react";
import { Box, MenuItem, Select, Typography } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";
import type { DailySalesPoint } from "@typings/ui/uiModules";
import NoisyCard from "../Cards/NoisyCard";

interface DailySalesBarChartProps {
    data: DailySalesPoint[];
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
            <Box
                sx={{
                    mt: 0.5,
                    px: 1,
                    py: 0.25,
                    borderRadius: "6px",
                    bgcolor: "rgba(139,92,246,0.25)",
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

const DailySalesBarChart = ({
    data,
    granularityOptions = ["Día", "Semana", "Mes"],
    defaultGranularity = "Día",
    onGranularityChange,
}: DailySalesBarChartProps): React.ReactNode => {
    const [granularity, setGranularity] = useState(defaultGranularity);

    return (
        <Box
            sx={{
                p: 2.5,
                height: "100%",
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: "rgba(255,255,255,0.08)",
                bgcolor: "rgba(255,255,255,0.02)",
            }}
        >
            <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 2 }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                    Unidades vendidas por día
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
                        minWidth: 90,
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
                    <BarChart data={data} margin={{ top: 8, right: 4, left: -20, bottom: 0 }}>
                        <CartesianGrid vertical={false} stroke="rgba(255,255,255,0.06)" />
                        <XAxis
                            dataKey="date"
                            interval={4}
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                            axisLine={{ stroke: "rgba(255,255,255,0.1)" }}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fill: "rgba(255,255,255,0.5)", fontSize: 11 }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(139,92,246,0.08)" }} />
                        <Bar dataKey="units" fill="#8B5CF6" radius={[4, 4, 0, 0]} maxBarSize={14} />
                    </BarChart>
                </ResponsiveContainer>
            </Box>
        </Box>
    );
};

export default DailySalesBarChart;