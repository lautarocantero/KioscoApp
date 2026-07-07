import { Box, Typography } from "@mui/material";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import type { AnalyticsKpi } from "@typings/ui/analytics.types";

interface KpiCardProps {
    kpi: AnalyticsKpi;
}

const KpiCard = ({ kpi }: KpiCardProps): React.ReactNode => {
    const isPositive = kpi.deltaPct >= 0;

    return (
        <Box
            sx={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 2,
                p: 2,
                borderRadius: "14px",
                border: "0.5px solid",
                borderColor: "rgba(255,255,255,0.08)",
                bgcolor: "rgba(255,255,255,0.02)",
                height: "100%",
            }}
        >
            <Box sx={{ minWidth: 0 }}>
                <Typography variant="caption" sx={{ color: "text.secondary", display: "block", mb: 1 }}>
                    {kpi.label}
                </Typography>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: 1, flexWrap: "wrap" }}>
                    <Typography variant="h5" sx={{ fontWeight: 700 }}>
                        {kpi.value}
                    </Typography>
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            color: isPositive ? "#4ADE80" : "#F87171",
                        }}
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
                sx={{
                    width: 36,
                    height: 36,
                    minWidth: 36,
                    borderRadius: "50%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: `${kpi.iconColor}22`,
                    color: kpi.iconColor,
                }}
            >
                {kpi.icon}
            </Box>
        </Box>
    );
};

export default KpiCard;