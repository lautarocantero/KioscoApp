//─────────────────── Componente 🧩: CartProductPriceColumn ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Columna genérica label + valor, usada para "Precio unitario" y "Subtotal"
// dentro de la fila de producto del carrito.
//
//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";

type CartProductPriceColumnProps = {
    label: string;
    value: string;
}

const CartProductPriceColumnComponent = ({ label, value }: CartProductPriceColumnProps): React.ReactNode => (
    <Grid sx={{ display: 'flex', flexDirection: 'column', minWidth: '6em' }}>
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.translucidWhite,
                fontSize: theme?.typography?.caption?.fontSize,
            })}
        >
            {label}
        </Typography>
        <Typography
            sx={(theme: Theme) => ({
                color: theme?.custom?.fontColor,
                fontWeight: 600,
                fontSize: theme?.typography?.body2?.fontSize,
            })}
        >
            {value}
        </Typography>
    </Grid>
)

export default CartProductPriceColumnComponent;