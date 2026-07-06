//─────────────────── Componente 🧩: CartProductButtons ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Botón único para eliminar por completo un producto del carrito
// (reemplaza los dos botones anteriores de "eliminar uno" / "eliminar todos",
// ya que ahora la cantidad se maneja con el stepper de CartProductQuantity).
//
//-----------------------------------------------------------------------------//

import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import { IconButton, Tooltip, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch as SellerDispatch } from "../../../../store/seller/sellerSlice";
import { removeFromCartThunk } from "../../../../store/seller/sellerThunks";
import { CartAmount } from "../../../../typings/seller/seller";
import type { CartProductButtonsProps } from "../../../../typings/sells/types/sellsTypes";

const CartProductButtons = ({_id}: CartProductButtonsProps): React.ReactNode => {
    const dispatch = useDispatch<SellerDispatch>();

    return (
        <Tooltip title="Eliminar del carrito">
            <IconButton
                onClick={() => dispatch(removeFromCartThunk({ _id, amount: CartAmount.All }))}
                sx={(theme: Theme) => ({
                    border: `1px solid ${theme?.custom?.whiteTranslucid}`,
                    borderRadius: '0.6em',
                })}
            >
                <DeleteOutlineIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.custom?.white })} />
            </IconButton>
        </Tooltip>
    )
}

export default CartProductButtons;