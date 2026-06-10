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
import type { RootState as SellerState } from "../../../../../store/seller/sellerSlice";
import type { ProductTicketType } from "../../../../../typings/seller/sellerTypes";


export const CartButtonComponent = (): React.ReactNode => {
    const { seller } = useSelector((state: SellerState) => state);
    const { cart } : {cart: ProductTicketType[]} = seller;

    const navigate: NavigateFunction = useNavigate();
    const location = useLocation();

    if(!cart) return null;
    if(cart?.length === 0) return null;
    if (location.pathname !== "/new-sell") return null;

    return (
        <Grid
          container
          onClick={ () => navigate('/cart')}
          sx={{
            margin: '0.2em 0',
            display: 'flex',
            justifyContent: 'end',
            width: '100%',
          }}
        >
          <Tooltip title="Ver Carrito">
            <Grid
              className="animate__animated animate__backInRight"
              sx={(theme: Theme) => ({
                backgroundColor: theme?.custom?.backgroundDark,
                width: { xs: '4em', md: '5em'},
                display: 'flex',
                alignItems: 'center',
                gap: '0.5em',
                padding: '0.2em 1em',
                borderRadius: '0.2em 0.2em 4em 4em',
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: theme?.custom?.white,
                  cursor: 'pointer',
                },
                '&:hover .MuiSvgIcon-root': {
                  color: theme?.palette?.primary?.main,
                },
                '&:hover .item-count': {
                  color: theme?.palette?.primary?.main,
                },
              })}
            >
                {/*─────────────────── 🔎 Número de ítems  🔎 ───────────────────*/}
              <span
                style={{
                  fontWeight: 'bold',
                  fontSize: '1.2em',
                }}
              >
                <Typography
                    className="item-count"
                    sx={(theme: Theme) => ({
                        color: theme?.palette?.success?.main,
                    })}
                >
                    {cart?.length}
                </Typography>
              </span>
              {/*─────────────────── 🔎 Ícono de carrito 🔎 ───────────────────*/}
              <ShoppingCartIcon
                sx={(theme: Theme) => ({
                  color: theme?.palette?.success?.main,
                  fontSize: 
                    { 
                        xs: theme?.typography?.body1?.fontSize,
                        md: theme?.typography?.h3?.fontSize
                    },
                  transition: 'color 0.3s ease',
                })}
              />
            </Grid>
          </Tooltip>
        </Grid>

    )
};

export default  CartButtonComponent;