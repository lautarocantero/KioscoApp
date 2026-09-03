import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";


const CartLabel = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box display="flex" alignItems="center" gap={0.75}>
            <Box
                component="img"
                src={getPublicAssetUrl("images/logo/StockoLogo.png")}
                alt=""
                sx={{ width: 22, height: 22, objectFit: "contain", display: "block" }}
            />
            <Typography
                sx={(theme: Theme) => ({
                    color: theme?.palette?.primary?.main,
                    fontWeight: 700,
                    fontSize: theme?.typography?.h5?.fontSize,
                })}
            >
                {t("cart.header.title")}
            </Typography>
        </Box>
    )
}

export default CartLabel;
