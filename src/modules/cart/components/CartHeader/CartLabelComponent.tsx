import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { CartLabelProps } from '@typings/cart/cartComponentTypes';
import type { ReactNode } from 'react';


const CartLabel = ({itemsCount}: CartLabelProps ): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box display="flex" alignItems="center" gap={1.5}>
            <ShoppingCartIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
            <Box>
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.palette?.primary?.main,
                        fontWeight: 700,
                        fontSize: theme?.typography?.h5?.fontSize,
                    })}
                >
                    {t("cart.header.title")}{" "}
                    <Box
                    component="span"
                    sx={(theme: Theme) => ({
                        color: itemsCount > 0 ? theme.palette?.secondary?.main : theme.custom?.white,
                    })}
                    >
                    {itemsCount}
                    </Box>
                </Typography>
            </Box>
        </Box>
    )
}

export default CartLabel;