import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Typography, type Theme } from "@mui/material";
import type { CartLabelProps } from '@typings/seller/sellerComponentTypes';
import type { ReactNode } from 'react';


const CartLabel = ({ itemsCount }: CartLabelProps): ReactNode => {

    if (itemsCount <= 0) return null;

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
                    Carrito
                </Typography>
            </Box>
        </Box>
    )
}

export default CartLabel;