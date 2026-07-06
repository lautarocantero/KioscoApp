//─────────────────── Componente 🧩: CartAddMoreProducts ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Card con borde punteado para volver a la pantalla de productos y
// seguir agregando presentaciones al carrito.
//
//-----------------------------------------------------------------------------//

import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { Grid, Typography, type Theme } from "@mui/material";

type CartAddMoreProductsProps = {
    onClick: () => void;
}

const CartAddMoreProductsComponent = ({ onClick }: CartAddMoreProductsProps): React.ReactNode => {
    return (
        <Grid
            container
            onClick={onClick}
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 0.5,
                border: `1.5px dashed ${theme?.custom?.translucidWhite}`,
                borderRadius: '1em',
                padding: '1.5em',
                marginTop: '0.7em',
                cursor: 'pointer',
                '&:hover': {
                    backgroundColor: theme?.custom?.translucidWhite,
                },
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: theme?.palette?.primary?.main,
                    fontWeight: 600,
                })}
            >
                <AddCircleOutlineIcon /> Agregar más productos
            </Typography>
            <Typography
                sx={(theme: Theme) => ({
                    color: theme?.custom?.translucidWhite,
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
            >
                Busca y agrega más presentaciones a tu carrito
            </Typography>
        </Grid>
    )
}

export default CartAddMoreProductsComponent;