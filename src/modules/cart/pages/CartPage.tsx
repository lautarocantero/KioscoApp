
//─────────────────── Pagina 🧩: CartPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Página de carrito que muestra la informacion de los productos y crea un ticket de compra, que se guarda en local
// storage para dar la posibilidad de descargar el ticket desde otra pantalla (/OrderConfirmed)

//──────────────────── Funciones 🔧 ─────────────────────//
// -`CartPage`: componente principal que controla la vista del carrito.

//─────────────────── 📝 To do: Cambiar el nombre fijo del vendedor ───────────────────//

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import type { AppDispatch, RootState as SellerState } from "../../../store/seller/sellerSlice";
import type { ProductTicketType } from "../../../typings/seller/sellerTypes";
import { PaymentMethods } from "../../../typings/sells/sells";
import type { SaleTicketInterface } from "../../../typings/sells/sellsTypes";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import AppLayout from "../../shared/layout/AppLayout";
import CartButtonsComponent from "../components/CartButtonsComponent";
import CartPrice from "../components/CartPriceComponent";
import CartProductsList from "../components/CartProductsListComponent";
import { createPdfTicket } from "../helpers/createPdfTicket";
import { cleanCartThunk } from "../../../store/seller/sellerThunks";
import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { iva } from "../../../config/constants";

const EmptyCartComponent = ():React.ReactNode => {
    return (
        <AppLayout>
            <SimpleGrid title={'Mi Carrito'} position="center">
                <Grid
                  container
                  sx={{
                    width: '90%',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    flexDirection: 'column',
                    mt: '2em'
                  }}
                >
                  <Typography
                    sx={(theme: Theme) => ({
                      color: theme?.custom?.white,
                      fontSize: {
                        xs: theme?.typography?.body1?.fontSize,
                        sm: theme?.typography?.h3?.fontSize,
                        md: theme?.typography?.h2?.fontSize,
                      },
                      textAlign: 'center',
                    })}
                  >
                    ¡Agrega productos al carrito!
                  </Typography>
                  <ProductionQuantityLimitsIcon 
                    sx={(theme: Theme) => ({
                      color: theme?.custom?.white,
                      fontSize: theme?.typography?.h1?.fontSize,
                    })}
                  />
                </Grid>
            </SimpleGrid>
        </AppLayout>
    )
}


const CartPage = ():React.ReactNode => {
    const { seller } = useSelector((state: SellerState) => state);
    const { cart } : {cart: ProductTicketType[]} = seller;

    const dispatch = useDispatch<AppDispatch>();

    const productsTotalPrice: number = cart?.reduce((count: number, product: ProductTicketType) => count + product.price * product.stock_required, 0);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const total: number = productsTotalPrice + ivaAmount; 

    const navigate: NavigateFunction = useNavigate();

    const generateTicket = (): void => {
        const ticket: SaleTicketInterface = {
            ticket_id: crypto.randomUUID(),
            date: new Date().getDate(), 
            cashier_name: 'Claudia',
            cashier_id: 'Claudia',
            payment_method: PaymentMethods.transfer,
            products: cart,
            subtotal: productsTotalPrice,
            iva: ivaPercentage,
            total: total,
            currency: 'Ars',
        }
        localStorage.setItem('last_ticket',JSON.stringify(ticket));
        createPdfTicket(ticket);
        dispatch(cleanCartThunk());   
        navigate('/cart-order-confirmed')
    }

    if(cart?.length === 0) return <EmptyCartComponent />

    return (
        <AppLayout>
            <SimpleGrid title={'Mi Carrito'} position="center">
                <Grid
                    container
                    sx={{
                        width: '90%',
                        display: 'flex',
                        justifyContent: 'end',
                        mt: '2em'
                    }}
                >
                    <CartProductsList cart={cart}/>
                    <CartPrice 
                        productsTotalPrice={productsTotalPrice} 
                        ivaPercentage={ivaPercentage} 
                        ivaAmount={ivaAmount} 
                        total={total}
                    />
                    <CartButtonsComponent generateTicket={generateTicket}/>
                </Grid>
            </SimpleGrid>
        </AppLayout>
    )

};

export default CartPage;













































