import { Box, Typography, type Theme } from "@mui/material";
import { SellerStatus } from "@typings/seller/sellerEnums";
import { STATUS_LABELS } from "@typings/seller/sellerLabels";
import type { SellerStatusIndicatorProps } from "@typings/seller/sellerTypes";

const SellerStatusIndicator = ({ status }: SellerStatusIndicatorProps): React.ReactNode => {
    const isOnline = status === SellerStatus.Online;

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.75 }} role="status">
            <Box
                aria-hidden="true"
                sx={(theme: Theme) => ({
                    width: 8,
                    height: 8,
                    borderRadius: "50%",
                    flexShrink: 0,
                    bgcolor: isOnline ? theme.custom.accents.green : theme.custom.lightGray,
                })}
            />
            <Typography variant="body2" noWrap>
                {STATUS_LABELS[status] ?? status}
            </Typography>
        </Box>
    );
};

export default SellerStatusIndicator;
