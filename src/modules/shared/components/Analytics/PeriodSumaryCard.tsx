import { Box, Typography } from "@mui/material";
import NoisyCard from "../Cards/NoisyCard";
import type { PeriodSummaryCardProps } from "@typings/ui/analytics.types";


const PeriodSummaryCard = ({ items }: PeriodSummaryCardProps): React.ReactNode => (
    <NoisyCard sx={{ p: 2.5 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
            Resumen del período
        </Typography>

        <Box sx={{ display: "flex", gap: 3, flexWrap: "wrap" }}>
            {items.map((item) => (
                <Box key={item.label} sx={{ display: "flex", alignItems: "center", gap: 1.25, minWidth: 140 }}>
                    <Box
                        sx={{
                            width: 32,
                            height: 32,
                            minWidth: 32,
                            borderRadius: "50%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            bgcolor: `${item.iconColor}22`,
                            color: item.iconColor,
                        }}
                    >
                        {item.icon}
                    </Box>
                    <Box sx={{ minWidth: 0 }}>
                        <Typography variant="caption" sx={{ color: "text.secondary", display: "block" }}>
                            {item.label}
                        </Typography>
                        <Typography variant="body2" sx={{ fontWeight: 700 }}>
                            {item.value}
                        </Typography>
                        {item.subValue && (
                            <Typography variant="caption" sx={{ color: "text.secondary" }}>
                                {item.subValue}
                            </Typography>
                        )}
                    </Box>
                </Box>
            ))}
        </Box>
    </NoisyCard>
);

export default PeriodSummaryCard;