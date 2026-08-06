import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Grid, Typography, type Theme } from "@mui/material";
import type { ReactNode } from 'react';


const CartLabel = (): ReactNode => {


    return (
        <Grid size={12}>
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
        </Grid>
    )
}

export default CartLabel;