import { Box, Chip, Typography, type Theme } from "@mui/material";
import type { SellsKpiTileProps } from "@typings/sells/props";
import { getSellsKpiChipSx } from "./getSellsKpiChipSx";

const SellsKpiTile = ({ label, value, chipLabel, chipTone, subLabel, accentColor, bordered = true }: SellsKpiTileProps): React.ReactNode => {
    return (
        <Box
            sx={(theme: Theme) => ({
                px: bordered ? 2.5 : 0,
                pr: 2.5,
                pl: bordered ? 2.5 : 0,
                ...(bordered ? { borderLeft: `1px solid ${theme.custom.darkGray}` } : {}),
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: "0.72rem",
                    fontWeight: 600,
                    letterSpacing: "0.06em",
                    textTransform: "uppercase",
                    color: accentColor ?? theme.palette.primary.light,
                    minHeight: "2.4em",
                    display: "flex",
                    alignItems: "flex-end",
                })}
            >
                {label}
            </Typography>

            <Typography
                sx={(theme: Theme) => ({
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    color: accentColor ?? theme.custom.fontColor,
                    my: 0.75,
                })}
            >
                {value}
            </Typography>

            <Box sx={{ display: "flex", alignItems: "center", gap: 0.75, minWidth: 0 }}>
                <Chip
                    label={chipLabel}
                    size="small"
                    sx={(theme: Theme) => ({
                        ...getSellsKpiChipSx(theme, chipTone),
                        height: "auto",
                        borderRadius: "999px",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        textTransform: "uppercase",
                        whiteSpace: "nowrap",
                        flexShrink: 0,
                        "& .MuiChip-label": { px: 1, py: 0.25 },
                    })}
                />
                {subLabel && (
                    <Typography
                        variant="caption"
                        noWrap
                        sx={(theme: Theme) => ({ color: theme.custom.darkWhite })}
                    >
                        {subLabel}
                    </Typography>
                )}
            </Box>
        </Box>
    );
};

export default SellsKpiTile;
