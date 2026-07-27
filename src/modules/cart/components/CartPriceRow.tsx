import { Grid, Typography, type Theme } from "@mui/material";
import type { CartPriceRowProps } from "@typings/sells/SellComponentTypes";
import type { ReactNode } from "react";


const CartPriceRow = ({ label, value, valueColor, bold = false }: CartPriceRowProps ): ReactNode => (
    <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
    >
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.translucidWhite,
                fontSize: theme?.typography?.body2?.fontSize,
                fontWeight: bold ? 700 : 400,
                ...(bold ? { color: theme?.custom?.fontColor } : {}),
            })}
        >
            {label}
        </Typography>
        <Typography
            sx={(theme: Theme) => ({
                color: valueColor ? valueColor(theme) : theme?.custom?.white,
                fontSize: bold ? theme?.typography?.h6?.fontSize : theme?.typography?.body2?.fontSize,
                fontWeight: bold ? 700 : 600,
            })}
        >
            {value}
        </Typography>
    </Grid>
)

export default CartPriceRow;