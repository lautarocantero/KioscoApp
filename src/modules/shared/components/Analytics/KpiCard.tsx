import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { KpiCardProps } from "@typings/ui/analytics.types";

const KpiCard = ({ kpi }: KpiCardProps): React.ReactNode => {
    const isPositive = kpi.deltaPct >= 0;

    return (
        <Box
            sx={(theme: Theme) => ({
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 2,
                p: 2,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: theme?.custom?.darkGray,
                bgcolor: theme?.custom?.darkGray,
                height: "100%",
            })}
        >
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
                    {kpi.label}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                    <Typography
                        variant="h5"
                        sx={(theme: Theme) => ({
                            fontWeight: 700,
                            color: theme?.custom?.fontColor,
                        })}
                    >
                        {kpi.value}
                    </Typography>
                    <Box
                        sx={(theme: Theme) => ({
                            display: "flex",
                            alignItems: "center",
                            color: isPositive ? theme?.palette?.secondary?.main : theme?.palette?.error?.main,
                        })}
                    >
                        {isPositive ? <ArrowDropUpIcon fontSize="small" /> : <ArrowDropDownIcon fontSize="small" />}
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                            {Math.abs(kpi.deltaPct)}%
                        </Typography>
                    </Box>
                </Box>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mt: 0.5 }}>
                    {kpi.comparisonLabel}
                </Typography>
            </Box>

            <Box
                sx={(theme: Theme) => ({
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(kpi.iconColor ?? theme?.palette?.primary?.main ?? "#8B5CF6", 0.13),
                    color: kpi.iconColor,
                })}
            >
                {kpi.icon}
            </Box>
        </Box>
    );
};

export default KpiCard;