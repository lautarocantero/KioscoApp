import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";

const CustomTooltip = ({ active, payload, label }: any): React.ReactNode => {
    if (!active || !payload?.length) return null;
    return (
        <Box
            sx={(theme: Theme) => ({
                bgcolor: alpha(theme.custom.darkBackground, 0.95),
                border: "1px solid",
                borderColor: alpha(theme.palette.primary.main, 0.4),
                borderRadius: "8px",
                px: 1.5,
                py: 1,
            })}
        >
            <Typography
                variant="caption"
                sx={(theme: Theme) => ({
                    display: "block",
                    color: theme.palette.text.secondary,
                })}
            >
                {label}
            </Typography>
            <Typography
                variant="caption"
                sx={(theme: Theme) => ({
                    fontWeight: 700,
                    color: theme.custom.fontColor,
                    fontSize: theme.typography.caption.fontSize,
                })}
            >
                {payload[0].value} unidades en stock
            </Typography>
        </Box>
    );
};

export default CustomTooltip;