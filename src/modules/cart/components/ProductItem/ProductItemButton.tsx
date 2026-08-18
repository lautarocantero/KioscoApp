import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ProductItemButtonProps } from '@typings/cart/cartComponentTypes';
import type { ReactNode } from 'react';


const ProductItemButton = ({ onClick }: ProductItemButtonProps): ReactNode => {
  const { t } = useTranslation();

  return (
  <Button
    variant="contained"
    onClick={onClick}
    aria-label={t("cart.productItem.addButtonAriaLabel")}
    sx={(theme: Theme) => ({
      backgroundColor: theme?.custom?.darkMain,
      borderRadius: "0.5em",
      width: "100%",
      padding: "0.5em",
      minWidth: 0,
    })}
  >
    <AddShoppingCartIcon
      sx={(theme: Theme) => ({
        fontSize: "1.2rem",
        color: theme.custom?.white,
      })}
    />
  </Button>
  );
};

export default ProductItemButton;