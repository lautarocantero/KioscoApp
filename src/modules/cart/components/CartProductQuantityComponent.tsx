//─────────────────── Componente 🧩: CartProductQuantity ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Stepper de cantidad para un producto en el carrito.
// El "-" resta una unidad (dispatcha removeFromCartThunk con CartAmount.One).
//
//📝 To do: conectar el "+" a la lógica real de sumar una unidad al carrito
// (falta definir/crear el thunk correspondiente, ej: increaseCartThunk).
//
//-----------------------------------------------------------------------------//

import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { Grid, IconButton, Typography, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch as SellerDispatch } from "../../../../store/seller/sellerSlice";
import { removeFromCartThunk } from "../../../store/seller/sellerThunks";
import { CartAmount } from "../../../typings/seller/seller";

type CartProductQuantityProps = {
    _id: string;
    quantity: number;
}

const CartProductQuantityComponent = ({ _id, quantity }: CartProductQuantityProps): React.ReactNode => {
    const dispatch = useDispatch<SellerDispatch>();

    const handleIncrease = (): void => {
        // 📝 To do: dispatch del thunk que sume +1 unidad cuando exista
    };

    const handleDecrease = (): void => {
        dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }));
    }

    return (
        <Grid sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography
                sx={(theme: Theme) => ({
                    color: theme?.custom?.whiteTranslucid,
                    fontSize: theme?.typography?.caption?.fontSize,
                    mb: '0.2em',
                })}
            >
                Cantidad
            </Typography>
            <Grid
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    border: `1px solid ${theme?.custom?.whiteTranslucid}`,
                    borderRadius: '0.6em',
                    padding: '0.1em 0.4em',
                })}
            >
                <IconButton size="small" onClick={handleDecrease}>
                    <RemoveIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
                </IconButton>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.white, minWidth: '1em', textAlign: 'center' })}>
                    {quantity}
                </Typography>
                <IconButton size="small" onClick={handleIncrease}>
                    <AddIcon fontSize="inherit" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main })} />
                </IconButton>
            </Grid>
        </Grid>
    )
}

export default CartProductQuantityComponent;