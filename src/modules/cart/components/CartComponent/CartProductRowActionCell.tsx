import DeleteIcon from '@mui/icons-material/Delete';
import { Box, IconButton, Tooltip, type Theme } from "@mui/material";
import { useDispatch } from "react-redux";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import type { CartProductRowActionCellProps } from '@typings/cart/cartComponentTypes';
import { CartAmount } from '@typings/cart/cartEnums';
import type { AppDispatch } from '../../../../store/cart/cartSlice';
import { removeFromCartThunk } from '../../../../store/cart/cartThunks';


const CartProductRowActionCell = ({ product }: CartProductRowActionCellProps): ReactNode => {
  const dispatch = useDispatch<AppDispatch>();
  const { t } = useTranslation();

  return (
    <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%" }}>
      <Tooltip title={t("cart.table.removeItemTooltip")}>
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
          <DeleteIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.custom?.white })} />
        </IconButton>
      </Tooltip>
    </Box>
  );
};

export default CartProductRowActionCell;