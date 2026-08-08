import { Box, Typography } from "@mui/material";
import FilePresentOutlinedIcon from "@mui/icons-material/FilePresentOutlined";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ReceiptSummaryCardProps } from "@typings/receipt/receiptComponentTypes";

const ReceiptSummaryCard = ({ status, description }: ReceiptSummaryCardProps): React.ReactNode => (
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
                <FilePresentOutlinedIcon fontSize="large" />
            </Box>
            <Typography variant="h5" sx={{ fontWeight: 700, textAlign: "center" }}>
                {status}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ textAlign: "center", maxWidth: 260 }}>
                {description}
            </Typography>
        </Box>
    </NoisyCard>
);

export default ReceiptSummaryCard;
