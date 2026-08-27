import { Box, Skeleton } from "@mui/material";
import type { SellsContextBandSkeletonProps } from "@typings/sells/props";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";

// Alturas finales de cada bloque (88px KPIs, 56px sparkline, 44px alerta) —
// nunca un spinner de página completa, y nunca KPIs en 0 mientras carga.
const SellsContextBandSkeleton = ({ showAlertPlaceholder = true }: SellsContextBandSkeletonProps): React.ReactNode => {
    return (
        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <NoisyCard sx={{ padding: "20px 24px" }}>
                <Skeleton variant="rounded" height={88} sx={{ mb: 2 }} />
                <Skeleton variant="rounded" height={56} />
            </NoisyCard>

            {showAlertPlaceholder && <Skeleton variant="rounded" height={44} sx={{ borderRadius: "12px" }} />}
        </Box>
    );
};

export default SellsContextBandSkeleton;
