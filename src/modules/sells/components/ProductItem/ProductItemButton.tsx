import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import { Button, type Theme } from "@mui/material";

export interface ProductItemButtonProps {
  onClick?: () => void;
}

const ProductItemButton = ({ onClick }: ProductItemButtonProps): React.ReactNode => (
  <Button
    variant="contained"
    onClick={onClick}
    aria-label="Agregar al carrito"
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

export default ProductItemButton;