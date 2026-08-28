import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Box, Tooltip, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { CartButtonComponentProps } from '@typings/cart/cartComponentTypes';
import "animate.css";
import type { ReactNode } from 'react';


export const CartButtonComponent = ({ cart }: CartButtonComponentProps): ReactNode => {
    const { t } = useTranslation();
    const { goToCart, count } = cart;

    return (
      <Tooltip title={t("cart.catalog.cartButton.tooltip")}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          onClick={goToCart}
          sx={(theme: Theme) => ({
            flex: '0 0 auto',
            minWidth: '3.5em',
            height: '3.25em',
            position: 'relative',
            cursor: 'pointer',
            border: `1px solid ${theme?.custom?.darkGray}`,
            borderRadius: "8px",
            '&:hover': {
              backgroundColor: theme?.custom?.darkBackground,
            }
          })}
        >
        
          <Box
            sx={() => ({
              borderRadius: '50%',
              width: '2em',
              height: '2em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              position: 'relative',
              transition: 'all 0.3s ease',
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
                color: !count || count === 0 ? theme?.custom?.darkMain : theme?.palette?.secondary?.main,
                borderRadius: '50%',
                width: '1.6em',
                height: '1.6em',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.9em',
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