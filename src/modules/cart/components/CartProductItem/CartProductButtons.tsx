//─────────────────── Componente 🧩: CartProductButtons ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Botón único de eliminar producto del carrito (elimina todas las unidades).
//
//-----------------------------------------------------------------------------//

import DeleteIcon from '@mui/icons-material/Delete';
import { Grid, IconButton, Tooltip, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch as SellerDispatch } from "../../../../store/seller/sellerSlice";
import { removeFromCartThunk } from "../../../../store/seller/sellerThunks";
import { CartAmount } from "../../../../typings/seller/seller";
import type { CartProductButtonsProps } from "../../../../typings/sells/types/sellsTypes";

const CartProductButtonsComponent = ({ _id }: CartProductButtonsProps): React.ReactNode => {
    const dispatch = useDispatch<SellerDispatch>();

    return (
        <Grid sx={{ flexShrink: 0 }}>
            <Tooltip title="Eliminar producto">
                <IconButton
                    onClick={() => dispatch(removeFromCartThunk({ _id, amount: CartAmount.All }))}
                    sx={(theme: Theme) => ({
                        backgroundColor: theme?.custom?.backgroundDark,
                        border: `1px solid ${theme?.custom?.translucidWhite}`,
                        borderRadius: '0.3em',
                        width: '1.6em',
                        height: '1.6em',
                        '&:hover': {
                            backgroundColor: theme?.custom?.translucidWhite,
                        },
                    })}
                >
                    <DeleteIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.custom?.fontColor })} />
                </IconButton>
            </Tooltip>
        </Grid>
    )
}

export default CartProductButtonsComponent;