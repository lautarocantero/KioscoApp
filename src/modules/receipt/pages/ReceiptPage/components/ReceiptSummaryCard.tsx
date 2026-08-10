import { Box, Chip, LinearProgress, Stack, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ReceiptSummaryCardProps } from "@typings/receipt/receiptComponentTypes";

const ReceiptSummaryCard = ({
    status,
    description,
    progress,
    isProcessing,
    stats,
}: ReceiptSummaryCardProps): React.ReactNode => {
    const isLoading = progress !== undefined;
    const hasIssues = stats && (stats.productsFailed > 0 || stats.presentationsFailed > 0 || stats.pendingReviewCount > 0);

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
                        bgcolor: hasIssues ? "warning.main" : "primary.main",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        color: "common.white",
                    }}
                >
                    {stats && !isLoading ? (
                        hasIssues ? <ErrorOutlineIcon fontSize="large" /> : <CheckCircleOutlineIcon fontSize="large" />
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

                {isLoading && (
                    <Box sx={{ width: "100%", px: 1 }}>
                        <LinearProgress
                            variant={isProcessing ? "indeterminate" : "determinate"}
                            value={isProcessing ? undefined : progress}
                            sx={{ height: 8, borderRadius: 4 }}
                        />
                        {!isProcessing && (
                            <Typography variant="caption" color="text.secondary" sx={{ display: "block", textAlign: "right", mt: 0.5 }}>
                                {progress}%
                            </Typography>
                        )}
                    </Box>
                )}

                {stats && (
                    <Stack direction="row" spacing={1} flexWrap="wrap" justifyContent="center" sx={{ rowGap: 1 }}>
                        <Chip size="small" label={`${stats.productsInserted} productos`} color="primary" variant="outlined" />
                        <Chip size="small" label={`${stats.presentationsInserted} presentaciones`} color="primary" variant="outlined" />
                        {stats.productsSkipped + stats.presentationsSkipped > 0 && (
                            <Chip size="small" label={`${stats.productsSkipped + stats.presentationsSkipped} duplicados`} color="default" variant="outlined" />
                        )}
                        {stats.productsFailed + stats.presentationsFailed > 0 && (
                            <Chip size="small" label={`${stats.productsFailed + stats.presentationsFailed} fallidos`} color="error" variant="outlined" />
                        )}
                        {stats.pendingReviewCount > 0 && (
                            <Chip size="small" label={`${stats.pendingReviewCount} a revisar`} color="warning" variant="outlined" />
                        )}
                    </Stack>
                )}
            </Box>
        </NoisyCard>
    );
};

export default ReceiptSummaryCard;