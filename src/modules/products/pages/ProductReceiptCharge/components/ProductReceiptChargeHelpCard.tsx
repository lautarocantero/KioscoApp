import { Box, Button, Typography } from "@mui/material";
import SupportAgentOutlinedIcon from "@mui/icons-material/SupportAgentOutlined";
import NoisyCard from "../../../../shared/components/Cards/NoisyCard";
import type { ProductReceiptChargeHelpCardProps } from "@typings/product/productComponentTypes";

const ProductReceiptChargeHelpCard = ({
    helpDescription,
    buttonLabel,
    onSupportClick,
}: ProductReceiptChargeHelpCardProps): React.ReactNode => (
    <NoisyCard sx={{ p: 3, borderRadius: "24px" }}>
        <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
            <SupportAgentOutlinedIcon sx={{ color: "primary.main" }} />
            <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>
                ¿Necesitás ayuda?
            </Typography>
        </Box>

        <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
            {helpDescription}
        </Typography>

        <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={onSupportClick}
            sx={{ textTransform: "none" }}
        >
            {buttonLabel}
        </Button>
    </NoisyCard>
);

export default ProductReceiptChargeHelpCard;
