
//─────────────────── Componente 🧩: CartProductButtons ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Renderiza un par de botones de acción para manipular productos en el carrito.
// Cada botón muestra un ícono (eliminar uno o eliminar todos) y ejecuta una acción
// despachando thunks de Redux para actualizar el estado del carrito.
//
//──────────────────── Funciones 🔧 ─────────────────────//
//
//─────────────────── Notas técnicas 💽 ───────────────────//
// - `removeFromCartThunk` es despachado para modificar el estado global del carrito.
//
//-----------------------------------------------------------------------------//

import DeleteIcon from '@mui/icons-material/Delete';
import DeleteSweepIcon from '@mui/icons-material/DeleteSweep';
import { Grid, Tooltip, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch as SellerDispatch } from "../../../../store/seller/sellerSlice";
import { removeFromCartThunk } from "../../../../store/seller/sellerThunks";
import { CartAmount, CartSide } from "../../../../typings/seller/seller";
import type { CartProductButtonInterface, CartProductButtonsInterface } from "../../../../typings/sells/sellsTypes";

const CartButton = ({icon, side, action}: CartProductButtonInterface ):React.ReactNode => {

    return (
        <Tooltip title={side === CartSide.Left ? 'Eliminar uno' : 'Eliminar todos'}>
            <Grid 
                size={6} 
                sx={(theme: Theme) => ({
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundColor: theme?.custom?.backgroundDark,
                    height: '100%',
                    borderRadius: side === CartSide.Left ? 
                    '0em 0em 0em 1em' : 
                    '0em 0em 1em 0em',
                    border: `1px solid ${theme?.custom?.whiteTranslucid}`, 
                    borderTop: 'none',
                    '&:hover': {
                        backgroundColor: theme?.custom?.whiteTranslucid,
                    }
                })}
                onClick={action}
            >
                {icon}
            </Grid>
        </Tooltip>
    )
}

const CartProductButtons = ({_id}: CartProductButtonsInterface): React.ReactNode => {
    const dispatch = useDispatch<SellerDispatch>();

    return (
        <Grid
            size={12}
            sx={{
                display: 'flex',
                flexDirection: 'row',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                '&:hover': {
                    cursor: 'pointer',
                }
            }}
        >
            <CartButton 
                icon={<DeleteIcon sx={(theme: Theme) => ({color: theme?.custom?.fontColor})}/>} 
                side={CartSide.Left}
                action={() => dispatch(removeFromCartThunk({ _id, amount: CartAmount.One }))}
            />
            <CartButton 
                icon={<DeleteSweepIcon sx={(theme: Theme) => ({color: theme?.custom?.fontColor})}/>} 
                side={CartSide.Right}
                action={() => dispatch(removeFromCartThunk({ _id, amount: CartAmount.All }))}
            />
        </Grid>
    )
}

export default CartProductButtons;