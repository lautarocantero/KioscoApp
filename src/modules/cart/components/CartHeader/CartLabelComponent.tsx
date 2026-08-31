import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';


const CartLabel = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box display="flex" alignItems="center" gap={0.75}>
            <ShoppingCartIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
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
