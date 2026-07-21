import { Box, Chip, Grid, Typography, useTheme } from "@mui/material";
import type { SellDetailInfoBarProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { useSellInfoItems } from "../../../../hooks/sells/useSellInfoItems";

const SellDetailInfoBar = (props: SellDetailInfoBarProps): ReactNode => {
    const theme = useTheme();
    const items = useSellInfoItems(props);

    return (
        <Grid size={12}>
            <NoisyCard
                component="dl"
                aria-label="Información general de la venta"
                sx={{
                    p: 2,
                    m: 0,
                    display: "grid",
                    gap: 2,
                    gridTemplateColumns: {
                        xs: "1fr",
                        md: "repeat(2, 1fr)",
                        lg: "repeat(4, 1fr)",
                    },
                }}
            >
                {items.map((item) => (
                    <Box
                        key={item.label}
                        sx={{ display: "flex", gap: 1.5, alignItems: "flex-start" }}
                    >
                        <Box
                            aria-hidden="true"
                            sx={{
                                width: 36,
                                height: 36,
                                borderRadius: "50%",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                bgcolor: `${item.color}22`,
                                color: item.color,
                                flexShrink: 0,
                            }}
                        >
                            {item.icon}
                        </Box>
                        <Box>
                            <Typography component="dt" variant="caption" color="text.secondary">
                                {item.label}
                            </Typography>
                            <Typography component="dd" variant="body2" fontWeight={600} sx={{ m: 0 }}>
                                {item.value}
                            </Typography>
                            {item.hint && (
                                <Typography variant="caption" color="text.disabled">
                                    {item.hint}
                                </Typography>
                            )}
                            {item.badge && (
                                <Chip
                                    size="small"
                                    label={item.badge}
                                    role="status"
                                    aria-label={`${item.label}: ${item.badge}`}
                                    sx={{
                                        display: "block",
                                        width: "fit-content",
                                        height: 18,
                                        mt: 0.3,
                                        fontSize: "0.65rem",
                                        fontWeight: 700,
                                        bgcolor: `${theme.palette.warning.main}22`,
                                        color: theme.palette.warning.main,
                                        "& .MuiChip-label": { px: 0.8 },
                                    }}
                                />
                            )}
                        </Box>
                    </Box>
                ))}
            </NoisyCard>
        </Grid>
    );
};

export default SellDetailInfoBar;