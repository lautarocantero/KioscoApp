import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import { Box, Grid, Typography, type Theme } from "@mui/material";
import type { ReactNode } from 'react';
import CartPriceComponent from './CartPriceComponent';
import type { CartSellDataComponentProps } from '@typings/seller/sellerComponentTypes';


const CartSellDataComponent = ({ 
    productsTotalPrice,
    ivaPercentage,
    ivaAmount,
    total,
}: CartSellDataComponentProps): ReactNode => {
    return (
        <Grid
            container
            sx={() => ({
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                position: { md: 'sticky' },
                top: { md: '2em' },
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    color: theme?.custom?.fontColor,
                    fontWeight: 700,
                })}
            >
                <Box
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme?.palette?.primary?.main,
                        color: theme?.custom?.white,
                        borderRadius: '0.5em',
                        width: '1.7em',
                        height: '1.7em',
                    })}
                >
                    <DescriptionOutlinedIcon />
                </Box>
                Resumen de venta
            </Typography>

            <CartPriceComponent
                productsTotalPrice={productsTotalPrice}
                ivaPercentage={ivaPercentage}
                ivaAmount={ivaAmount}
                total={total}
            />
        </Grid>
    )
}

export default CartSellDataComponent;