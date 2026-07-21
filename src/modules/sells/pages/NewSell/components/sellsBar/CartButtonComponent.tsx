import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Tooltip, Typography, type Theme } from "@mui/material";
import "animate.css";
import { useSellbar } from 'hooks/sells/useSellBar';

export const CartButtonComponent = (): React.ReactNode => {
    const { cart } = useSellbar();
    const { goToCart, count } = cart;

    return (
      <Tooltip title="Ver Carrito">
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={goToCart}
          sx={(theme: Theme) => ({ 
            flex: 1,
            position: 'relative',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: theme?.custom?.darkBackground,
            }
          })}
        >
        
          <Box
            sx={(theme: Theme) => ({
              borderRadius: '50%',
              width: '2em',
              height: '2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
              transition: 'all 0.3s ease',
              '&:hover .MuiSvgIcon-root': { color: theme?.palette?.primary?.main },
              '&:hover .cart-badge': { backgroundColor: theme?.palette?.primary?.main },
            })}
                  >
            <ShoppingCartIcon
              sx={(theme: Theme) => ({
                color: theme?.palette?.secondary?.main,
                fontSize: theme?.typography?.body1?.fontSize,
                transition: 'color 0.3s ease',
              })}
            />
            <Typography
              className="cart-badge"
              sx={(theme: Theme) => ({
                position: 'absolute',
                right: '-1em',
                backgroundColor: theme?.custom?.darkSecondary,
                color: theme?.custom?.white,
                borderRadius: '50%',
                width: '1.3em',
                height: '1.3em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7em',
                fontWeight: 'bold',
                lineHeight: 1,
                transition: 'background-color 0.3s ease',
              })}
            >
              {count}
            </Typography>
          </Box>
      </Box>
    </Tooltip>
  );
};

export default CartButtonComponent;