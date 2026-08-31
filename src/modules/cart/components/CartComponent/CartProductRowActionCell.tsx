import CloseIcon from '@mui/icons-material/Close';
import { IconButton, Tooltip, type Theme } from "@mui/material";
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
    <Tooltip title={t("cart.table.removeItemTooltip")}>
      <IconButton
        size="small"
        onClick={() => dispatch(removeFromCartThunk({ _id: product._id, amount: CartAmount.All }))}
        sx={(theme: Theme) => ({
          flexShrink: 0,
          p: "0.2em",
          color: theme.custom?.darkWhite,
          "&:hover": { backgroundColor: theme.custom?.errorLight, color: theme.palette.error.main },
        })}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Tooltip>
  );
};

export default CartProductRowActionCell;