import { alpha } from "@mui/material/styles";
import { Box, Typography, type Theme } from "@mui/material"
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import type { AnalyticsHeaderProps } from "@typings/ui/analytics.types";


export const AnalyticsHeader = ({title, subtitle}: AnalyticsHeaderProps ) => {

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
            <Box
                sx={(theme: Theme) => ({
                    width: 44,
                    height: 44,
                    borderRadius: "12px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    bgcolor: alpha(theme.palette.primary.main, 0.18),
                    color: theme.palette.primary.main,
                })}
            >
                <BarChartOutlinedIcon />
            </Box>
            <Box>
                <Typography variant="h6" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                    {title} -{" "}
                    <Typography component="span" variant="inherit" sx={(theme: Theme) => ({ color: theme.palette.primary.main })}>
                        Demo
                    </Typography>
                </Typography>

                <Typography variant="body2" sx={{ color: "text.secondary" }}>
                    {subtitle}
                </Typography>
            </Box>
        </Box>
    )
}

export default AnalyticsHeader;