import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { SellerStatus } from "@typings/seller/sellerEnums";
import type { SellerStatusIndicatorProps } from "@typings/seller/sellerTypes";

const SellerStatusIndicator = ({ status }: SellerStatusIndicatorProps): React.ReactNode => {
    const { t } = useTranslation();
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
                {t(`sellerStatus.${status}`, { defaultValue: status })}
            </Typography>
        </Box>
    );
};

export default SellerStatusIndicator;
