import { Box, Grid, Skeleton, type Theme } from "@mui/material";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";

const ProviderSkeleton = (): React.ReactNode => {
    return (
        <NoisyCard maxWidth="100%">
            {/* Header */}
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, px: 3, pt: 3 }}>
                <Skeleton variant="circular" width={44} height={44} />
                <Skeleton variant="text" width="35%" height={28} />
            </Box>

            {/* Fields */}
            <Box sx={{ px: 3, py: 3 }}>
                <Skeleton variant="text" width={160} height={24} sx={{ mb: 2 }} />

                <Grid container spacing={3}>
                    {/* name, valoration, contact_phone, contact_email */}
                    {Array.from({ length: 4 }).map((_, i) => (
                        <Grid key={i} size={{ xs: 12, sm: 6 }}>
                            <Skeleton variant="text" width={100} height={20} sx={{ mb: 0.5 }} />
                            <Skeleton
                                variant="rounded"
                                height={44}
                                sx={(theme: Theme) => ({ bgcolor: theme.custom.darkBackground })}
                            />
                        </Grid>
                    ))}
                </Grid>
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

export default ProviderSkeleton;
