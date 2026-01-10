
//─────────────────── Pagina 🧩: CartPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Página de carrito que muestra la informacion de los productos y crea un ticket de compra, que se guarda en local
// storage para dar la posibilidad de descargar el ticket desde otra pantalla (/OrderConfirmed)

//──────────────────── Funciones 🔧 ─────────────────────//
// -`CartPage`: componente principal que controla la vista del carrito.
// - generateTicket: Genera un ticket con la informacion de la venta
// - CartProductsList: Muestra un listado con los productos
// - CartPrice: Muestra el precio final de la suma de los productos e impuestos
// - CartPaymentMethod: Muestra un listado para seleccionar el metodo de pago elegido
// - CartButtonsComponent: Muestra los botones de volver e imprimir ticket

//─────────────────── 📝 To do: Cambiar el nombre fijo del vendedor ───────────────────//

//-----------------------------------------------------------------------------//

import ProductionQuantityLimitsIcon from '@mui/icons-material/ProductionQuantityLimits';
import { Grid, Typography, type Theme } from "@mui/material";
import { useContext, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { iva } from "../../../config/constants";
import { createSellThunk } from "../../../store/sell/sellsThunks";
import type { AppDispatch, RootState as SellerState } from "../../../store/seller/sellerSlice";
import { cleanCartThunk } from "../../../store/seller/sellerThunks";
import type { ProductTicketType } from "../../../typings/seller/sellerTypes";
import type { PaymentMethod as PaymentMethodType } from "../../../typings/sells/enums/sells";
import { Currency, PaymentMethod } from "../../../typings/sells/enums/sells";
import type { SellTicketType } from "../../../typings/sells/types/sellsTypes";
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import AppLayout from "../../shared/layout/AppLayout";
import CartButtonsComponent from "../components/CartButtonsComponent";
import CartPaymentMethod from "../components/CartPaymentMethod";
import CartPrice from "../components/CartPriceComponent";
import CartProductsList from "../components/CartProductsListComponent";
import { createPdfTicket } from "../helpers/createPdfTicket";
import { SnackBarContext } from '../../shared/components/SnackBar/SnackBarContext';
import { AlertColor } from '../../../typings/ui/ui';

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
    const { showSnackBar } = useContext(SnackBarContext)!;

    const dispatch = useDispatch<AppDispatch>();

    const productsTotalPrice: number = cart?.reduce((count: number, product: ProductTicketType) => count + product.price * product.stock_required, 0);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const paymentMethodRef: React.RefObject<PaymentMethod> = useRef<PaymentMethodType>(PaymentMethod?.Transfer);
    const total: number = productsTotalPrice + ivaAmount; 

    const navigate: NavigateFunction = useNavigate();

    const generateTicket = async(): Promise<void> => {
        const ticket: SellTicketType = {
            ticket_id: crypto.randomUUID(),
            purchase_date: new Date().toLocaleDateString('es-AR',
              { day: '2-digit',
                month: '2-digit', 
                year: 'numeric', 
              }),
            modification_date: null, 
            seller_id: '0123',
            seller_name: 'Claudia',
            payment_method: paymentMethodRef?.current,
            products: cart,
            sub_total: productsTotalPrice,
            iva: ivaPercentage,
            total_amount: total,
            currency: Currency?.Ars,
        }

        localStorage.setItem('last_ticket',JSON.stringify(ticket));
        const response: string | undefined = await dispatch(createSellThunk({ data: ticket}));

        if(!response) {
            showSnackBar(`Ocurrio un error al agregar el producto.`, AlertColor.Error);
            throw new Error('Ocurrio un error registrando la compra, intentalo de nuevo');
        }

        createPdfTicket(ticket);
        await dispatch(cleanCartThunk());   
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
                        flexDirection: 'column',
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
                    <CartPaymentMethod paymentMethodRef={paymentMethodRef}/>
                    {/* //─────────────────── 📝 To do: Agregar mora ───────────────────// */}
                    <CartButtonsComponent generateTicket={generateTicket}/>
                </Grid>
            </SimpleGrid>
        </AppLayout>
    )

};

export default CartPage;













































