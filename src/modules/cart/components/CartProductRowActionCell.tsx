import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import type { AppDispatch } from '../../../store/seller/sellerSlice';
import { removeFromCartThunk } from '../../../store/seller/sellerThunks';
import { CartAmount } from '@typings/seller/seller';
import type { CartProductRowActionCellProps } from '@typings/sells/SellComponentTypes';
import type { ReactNode } from 'react';


const CartProductRowActionCell = ({ product }: CartProductRowActionCellProps): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Tooltip title="Eliminar producto del carrito">
        <IconButton
          onClick={() => dispatch(removeFromCartThunk({ _id: product._id, amount: CartAmount.All }))}
          sx={(theme: Theme) => ({
            backgroundColor: theme?.palette?.primary?.main,
            border: `1px solid ${theme?.custom?.translucidWhite}`,
            borderRadius: '0.3em',
            width: '1.6em',
            height: '1.6em',
            '&:hover': { backgroundColor: theme?.custom?.translucidWhite },
          })}
        >
          <DeleteIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.custom?.fontColor })} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CartProductRowActionCell;