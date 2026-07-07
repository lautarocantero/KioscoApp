import { Box, Typography } from "@mui/material";
import NoisyCard from "../Cards/NoisyCard";
import type { TopSellingDay } from "@typings/ui/analytics.types";

interface TopSellingDaysCardProps {
    days: TopSellingDay[];
}

const TopSellingDaysCard = ({ days }: TopSellingDaysCardProps): React.ReactNode => {
    const maxUnits = Math.max(...days.map((d) => d.units), 1);

    return (
        <NoisyCard sx={{ p: 2.5 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 600, mb: 2 }}>
                Días más vendidos
            </Typography>

            <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                {days.map((day, i) => (
                    <Box key={day.date} sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                        <Typography variant="body2" sx={{ color: "text.secondary", width: 16, flexShrink: 0 }}>
                            {i + 1}.
                        </Typography>
                        <Typography variant="body2" sx={{ width: 48, flexShrink: 0 }}>
                            {day.date}
                        </Typography>
                        <Box sx={{ flex: 1, height: 8, borderRadius: "6px", bgcolor: "rgba(255,255,255,0.06)", overflow: "hidden" }}>
                            <Box
                                sx={{
                                    height: "100%",
                                    width: `${(day.units / maxUnits) * 100}%`,
                                    borderRadius: "6px",
                                    background: "linear-gradient(90deg, #6D28D9, #A78BFA)",
                                }}
                            />
                        </Box>
                        <Typography variant="body2" sx={{ fontWeight: 600, width: 32, textAlign: "right", flexShrink: 0 }}>
                            {day.units}
                        </Typography>
                    </Box>
                ))}
            </Box>
        </NoisyCard>
    );
};

export default TopSellingDaysCard;