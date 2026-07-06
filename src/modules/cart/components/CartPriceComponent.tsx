//─────────────────── Componente 🧩: CartPrice ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Este componente se encarga de mostrar la informacion del precio del carrito
// tiene en cuenta la suma de los productos y el iva
//──────────────────── Funciones 🔧 ─────────────────────//
// CartPrice Componente principal que se encarga de renderizar filas con
// la informacion de productos, iva y total de la venta

//-----------------------------------------------------------------------------//

import { Divider, Grid, Typography, type Theme } from "@mui/material";
import { formatCurrency } from "../helpers/formatCurrency";
import type { CartPriceProps } from "@typings/sells/reactComponents";

const CartPriceRow = (
    { label, value, valueColor, bold = false }
    : { label: string, value: string, valueColor?: (theme: Theme) => string, bold?: boolean }
): React.ReactNode => (
    <Grid
        container
        display="flex"
        justifyContent="space-between"
        alignItems="center"
    >
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.whiteTranslucid,
                fontSize: theme?.typography?.body2?.fontSize,
                fontWeight: bold ? 700 : 400,
                ...(bold ? { color: theme?.custom?.white } : {}),
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

const CartPriceComponent = (
    { productsTotalPrice, ivaPercentage, ivaAmount, total, productsCount }
    : CartPriceProps & { productsCount?: number }): React.ReactNode => {

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
                    borderColor: theme?.custom?.whiteTranslucid,
                    my: 0.5,
                })}
            />

            <CartPriceRow
                label="Total a cobrar"
                value={formatCurrency(total)}
                valueColor={(theme) => theme?.custom?.posAccent}
                bold
            />
        </Grid>
    )
}

export default CartPriceComponent;