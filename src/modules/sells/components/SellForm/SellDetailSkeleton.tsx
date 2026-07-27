
import { Box, Grid, Skeleton, type Theme } from "@mui/material";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import type { ReactNode } from "react";


const SellDetailSkeleton = (): ReactNode => {
    return (
        <NoisyCard maxWidth="100%">
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 3, pt: 3 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="40%" height={28} />
                    <Skeleton variant="text" width="25%" height={20} />
                </Box>
            </Box>

            <Box sx={{ px: 3, py: 3 }}>
                <Grid container spacing={3}>
                    {/* SellDetailInfoBar */}
                    <Grid size={{ xs: 12 }}>
                        <Skeleton
                            variant="rounded"
                            height={72}
                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                        />
                    </Grid>

                    {/* SellDetailProductsSold */}
                    <Grid size={{ xs: 12 }}>
                        <Skeleton variant="text" width={180} height={28} sx={{ mb: 1 }} />
                        <Skeleton
                            variant="rounded"
                            height={140}
                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                        />
                    </Grid>

                    {/* SellDetailPaymentData */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Skeleton variant="text" width={140} height={28} sx={{ mb: 1 }} />
                        <Skeleton
                            variant="rounded"
                            height={100}
                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                        />
                    </Grid>

                    {/* SellDetailAditionalData */}
                    <Grid size={{ xs: 12, sm: 6 }}>
                        <Skeleton variant="text" width={160} height={28} sx={{ mb: 1 }} />
                        <Skeleton
                            variant="rounded"
                            height={100}
                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                        />
                    </Grid>

                    {/* SellDetailSoldData */}
                    <Grid size={{ xs: 12 }}>
                        <Skeleton
                            variant="rounded"
                            height={90}
                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                        />
                    </Grid>
                </Grid>
            </Box>

            {/* Footer buttons */}
            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    justifyContent: "space-between",
                    px: 3,
                    py: 2.5,
                    borderTop: `0.5px solid ${theme.custom.darkGray}`,
                })}
            >
                <Skeleton variant="rounded" width={120} height={40} />
                <Skeleton variant="rounded" width={120} height={40} />
            </Box>
        </NoisyCard>
    );
};

export default SellDetailSkeleton;