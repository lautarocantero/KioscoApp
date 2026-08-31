import { Grid, Typography, type Theme } from "@mui/material";
import type { CartPriceRowProps } from "@typings/cart/cartComponentTypes";
import type { ReactNode } from "react";


const CartPriceRow = ({ label, value }: CartPriceRowProps ): ReactNode => (
    <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
    >
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.translucidFontColor,
                fontSize: theme?.typography?.body2?.fontSize,
            })}
        >
            {label}
        </Typography>
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.fontColor,
                fontSize: theme?.typography?.body2?.fontSize,
                fontWeight: 600,
                fontVariantNumeric: "tabular-nums",
            })}
        >
            {value}
        </Typography>
    </Grid>
)

export default CartPriceRow;
