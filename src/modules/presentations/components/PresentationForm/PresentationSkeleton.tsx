import { Box, Grid, Skeleton, type Theme } from "@mui/material";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";

const PresentationSkeleton = (): React.ReactNode => {
    return (
        <NoisyCard maxWidth="100%">
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 3, pt: 3 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Box sx={{ flex: 1 }}>
                    <Skeleton variant="text" width="35%" height={28} />
                    <Skeleton variant="text" width="45%" height={20} />
                </Box>
            </Box>

            <Box sx={{ px: 3, py: 3, display: "flex", flexDirection: "column", gap: 3 }}>
                {/* GroupBasicInfo */}
                <Box>
                    <Skeleton variant="text" width={140} height={24} sx={{ mb: 1.5 }} />
                    <Grid container spacing={2}>
                        <Grid size={{ xs: 12, sm: 4 }}>
                            <Skeleton
                                variant="rounded"
                                height={140}
                                sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                            />
                        </Grid>
                        <Grid size={{ xs: 12, sm: 8 }}>
                            <Grid container spacing={2}>
                                {Array.from({ length: 4 }).map((_, i) => (
                                    <Grid key={i} size={{ xs: 12, sm: 6 }}>
                                        <Skeleton variant="text" width={90} height={18} sx={{ mb: 0.5 }} />
                                        <Skeleton
                                            variant="rounded"
                                            height={40}
                                            sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                                        />
                                    </Grid>
                                ))}
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                {/* GroupStock */}
                <Box>
                    <Skeleton variant="text" width={100} height={24} sx={{ mb: 1.5 }} />
                    <Skeleton
                        variant="rounded"
                        height={80}
                        sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                    />
                </Box>

                {/* GroupCommercialInfo */}
                <Box>
                    <Skeleton variant="text" width={160} height={24} sx={{ mb: 1.5 }} />
                    <Skeleton
                        variant="rounded"
                        height={80}
                        sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                    />
                </Box>
            </Box>

            {/* Footer */}
            <Box
                sx={(theme: Theme) => ({
                    display: "flex",
                    justifyContent: "flex-start",
                    px: 3,
                    py: 2.5,
                    borderTop: `0.5px solid ${theme.custom.darkGray}`,
                })}
            >
                <Skeleton variant="rounded" width={120} height={40} />
            </Box>
        </NoisyCard>
    );
};

export default PresentationSkeleton;