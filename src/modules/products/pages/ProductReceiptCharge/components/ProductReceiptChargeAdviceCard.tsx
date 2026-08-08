import { Box, Stack, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ProductReceiptChargeAdviceCardProps } from "@typings/product/productComponentTypes";

const ProductReceiptChargeAdviceCard = ({ adviceItems }: ProductReceiptChargeAdviceCardProps): React.ReactNode => (
    <NoisyCard sx={{ p: 3, borderRadius: "24px" }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 2 }}>
            Consejos
        </Typography>

        <Stack spacing={2}>
            {adviceItems.map((item) => (
                <Box key={item} sx={{ display: "flex", gap: 1, alignItems: "flex-start" }}>
                    <CheckCircleOutlineIcon sx={{ color: "success.main", mt: "4px" }} />
                    <Typography variant="body2" color="text.secondary">
                        {item}
                    </Typography>
                </Box>
            ))}
        </Stack>
    </NoisyCard>
);

export default ProductReceiptChargeAdviceCard;
