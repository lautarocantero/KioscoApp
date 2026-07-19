//─────────────────── Componente 🧩: CartButtonComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Botón flotante que muestra el carrito cuando contiene productos.
// Incluye número de ítems y un ícono de carrito animado.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - CartButtonComponent: componente principal.
//   - Usa useSelector para obtener cart desde el store de Redux.
//   - Si cart está vacío → no renderiza.
//   - Renderiza:
//      -Boton para ir a pagina de carrito

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Usa animate.css para animación de entrada.
// - Se integra en vistas de ventas como acceso rápido al carrito.

//-----------------------------------------------------------------------------//

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Grid, Tooltip, Typography, type Theme } from "@mui/material";
import "animate.css";
import { useSelector } from "react-redux";
import { useLocation, useNavigate, type NavigateFunction } from 'react-router-dom';
import type { RootState as SellerState } from "../../../../../../store/seller/sellerSlice";
import type { ProductTicketType } from "../../../../../../typings/seller/sellerTypes";


export const CartButtonComponent = (): React.ReactNode => {
    const { seller } = useSelector((state: SellerState) => state);
    const { cart } : {cart: ProductTicketType[]} = seller;

    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();

    // if(!cart) return null;
    // if(cart?.length === 0) return null;
    // if (location.pathname !== "/new-sell") return null;

    return (
    <Tooltip title="Ver Carrito">
      <Grid
        className="animate__animated animate__backInRight"
        onClick={() => navigate('/cart')}
        sx={(theme: Theme) => ({
          borderRadius: '50%',
          width: '2em',
          height: '2em',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.3s ease',
          '&:hover': { backgroundColor: theme?.custom?.white },
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
        {/* Badge con cantidad */}
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
          {cart?.length}
        </Typography>
      </Grid>
    </Tooltip>
  );
};

export default  CartButtonComponent;