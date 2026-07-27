import { Divider, Grid, type Theme } from "@mui/material";
import { formatCurrency } from "../helpers/formatCurrency";
import CartPriceRow from "./CartPriceRow";
import type { ReactNode } from "react";
import type { CartPriceProps } from "@typings/seller/sellerComponentTypes";


const CartPriceComponent = (
    { productsTotalPrice, ivaPercentage, ivaAmount, total, productsCount }
    : CartPriceProps & { productsCount?: number }): ReactNode => {

    return (
        <Grid
            container
            display="flex"
            flexDirection="column"
            gap={1.2}
        >
            <CartPriceRow
                label={productsCount ? `Productos (${productsCount})` : 'Productos'}
                value={formatCurrency(productsTotalPrice)}
            />
            <CartPriceRow
                label={`IVA (${ivaPercentage}%)`}
                value={formatCurrency(ivaAmount)}
            />

            <Divider
                sx={(theme: Theme) => ({
                    borderColor: theme?.custom?.translucidWhite,
                    my: 0.5,
                })}
            />

            <CartPriceRow
                label="Total a cobrar"
                value={formatCurrency(total)}
                valueColor={(theme) => theme?.palette?.secondary?.main}
                bold
            />
        </Grid>
    )
}

export default CartPriceComponent;