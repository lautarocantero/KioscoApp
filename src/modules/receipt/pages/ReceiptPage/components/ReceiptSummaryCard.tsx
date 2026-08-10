import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ReceiptSummaryCardProps } from "@typings/receipt/receiptComponentTypes";

const ReceiptSummaryCard = ({
    status,
    description,
    progress,
    showProgress,
    isProcessing,
    stats,
}: ReceiptSummaryCardProps): React.ReactNode => {
    return (
        <NoisyCard sx={{ p: 3, borderRadius: "24px" }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
                Resumen de la última carga
            </Typography>

            <Box
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 2,
                    py: 2,
                    px: 1,
                }}
            >
                <Box
                    sx={{
                        width: 72,
                        height: 72,
                        borderRadius: "50%",
                        bgcolor: "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "common.white",
                    }}
                >
                    {stats && !showProgress ? (
                        <CheckCircleOutlineIcon fontSize="large" />
                    ) : (
                        <FilePresentOutlinedIcon fontSize="large" />
                    )}
                </Box>

                <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
                    {status}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxWidth: 260 }}>
                    {description}
                </Typography>

                {showProgress && (
                    <Box sx={{ width: "100%", px: 1 }}>
                        <LinearProgress
                            variant={isProcessing ? "indeterminate" : "determinate"}
                            value={isProcessing ? undefined : progress}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                        {!isProcessing && progress !== undefined && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                                {progress}%
                            </Typography>
                        )}
                    </Box>
                )}

                {stats && (
                    <Stack spacing={1} sx={{ width: "100%" }}>
                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ rowGap: 1 }}>
                            <Chip size="small" label={`${stats.productsTotal} productos`} color="primary" variant="outlined" />
                            <Chip size="small" label={`${stats.productsInserted} nuevos`} color="primary" variant="outlined" />
                            {stats.productsSkipped > 0 && (
                                <Chip size="small" label={`${stats.productsSkipped} duplicados`} color="default" variant="outlined" />
                            )}
                            {stats.productsFailed > 0 && (
                                <Chip size="small" label={`${stats.productsFailed} fallidos`} color="error" variant="outlined" />
                            )}
                        </Stack>

                        <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ rowGap: 1 }}>
                            <Chip
                                size="small"
                                label={`${stats.presentationsCreated + stats.presentationsUpdated + stats.presentationsUnchanged} presentaciones`}
                                color="primary"
                                variant="outlined"
                            />
                            <Chip size="small" label={`${stats.presentationsCreated} nuevas`} color="primary" variant="outlined" />
                            {stats.presentationsUpdated > 0 && (
                                <Chip size="small" label={`${stats.presentationsUpdated} actualizadas`} color="info" variant="outlined" />
                            )}
                            {stats.presentationsFailed > 0 && (
                                <Chip size="small" label={`${stats.presentationsFailed} fallidas`} color="error" variant="outlined" />
                            )}
                        </Stack>
                    </Stack>
                )}
            </Box>
        </NoisyCard>
    );
};

export default ReceiptSummaryCard;