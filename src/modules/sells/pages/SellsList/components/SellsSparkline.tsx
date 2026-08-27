import { Box, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip } from "recharts";
import type { SellsSparklineProps } from "@typings/sells/props";
import SellsSparklineTooltip from "./SellsSparklineTooltip";

// Sólo lectura: el handoff habilita explícitamente dejar el click-para-
// filtrar-por-día fuera de alcance, así que no hay onClick ni cursor
// "pointer" en las barras.
const SellsSparkline = ({ points, bestDay, ariaLabel }: SellsSparklineProps): React.ReactNode => {
    const theme = useTheme();
    const { t } = useTranslation();

    const firstLabel = points[0]?.label ?? "";
    const lastLabel = points[points.length - 1]?.label ?? "";

    return (
        <Box
            role="img"
            aria-label={ariaLabel}
            sx={(theme: Theme) => ({
                width: { xs: "100%", md: 400 },
                flex: { xs: "auto", md: "none" },
                pl: { md: 3 },
                mt: { xs: 2, md: 0 },
                pt: { xs: 2, md: 0 },
                borderTop: { xs: `1px solid ${theme.custom.darkGray}`, md: "none" },
                borderLeft: { xs: "none", md: `1px solid ${theme.custom.darkGray}` },
            })}
        >
            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", mb: 1.25 }}>
                <Typography sx={{ fontSize: "0.8rem", fontWeight: 600 }}>
                    {t("sells.contextBand.sparkline.title")}
                </Typography>
                {bestDay && (
                    <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                        {t("sells.contextBand.sparkline.bestDay", { label: bestDay.label })}
                    </Typography>
                )}
            </Box>

            <Box sx={{ height: 56 }}>
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={points} barGap={5}>
                        <Tooltip content={SellsSparklineTooltip} cursor={{ fill: "transparent" }} />
                        <Bar dataKey="total" radius={[3, 3, 0, 0]} isAnimationActive={false}>
                            {points.map((point) => (
                                <Cell
                                    key={point.date}
                                    fill={bestDay && point.date === bestDay.date ? theme.palette.secondary.main : theme.palette.primary.main}
                                />
                            ))}
                        </Bar>
                    </BarChart>
                </ResponsiveContainer>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "space-between", mt: 0.75 }}>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {firstLabel}
                </Typography>
                <Typography variant="caption" sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}>
                    {lastLabel}
                </Typography>
            </Box>
        </Box>
    );
};

export default SellsSparkline;
