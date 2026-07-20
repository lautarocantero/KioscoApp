//─────────────────── Pagina 🧩: CartPage ───────────────────//

import { Grid } from "@mui/material";
import { useContext, useMemo, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import { iva } from "../../../config/constants";
import { createSellThunk } from "../../../store/sell/sellsThunks";
import type { AppDispatch, RootState as SellerState } from "../../../store/seller/sellerSlice";
import { cleanCartThunk } from "../../../store/seller/sellerThunks";
import type { ProductTicketType } from "../../../typings/seller/sellerTypes";
import type { PaymentMethod as PaymentMethodType } from "../../../typings/sells/sellsEnum";
import { Currency, PaymentMethod } from "../../../typings/sells/sellsEnum";
import type { SellTicketType } from "../../../typings/sells/types/sellsTypes";
import AppLayout from "../../shared/layout/AppLayout";
import CartPaymentMethod from "../components/CartPaymentMethod";
import CartPrice from "../components/CartPriceComponent";
import CartProductsList from "../components/CartProductsListComponent";
import { createPdfTicket } from "../../shared/helpers/createPdfTicket";
import { SnackBarContext } from '../../shared/components/SnackBar/SnackBarContext';
import { AlertColor } from '../../../typings/ui/ui';
import CartHeaderComponent from '../components/CartHeaderComponent';
import CartSummaryCardComponent from '../components/CartSumaryCardComponent';


const CartPage = (): React.ReactNode => {
    const { seller } = useSelector((state: SellerState) => state);
    const { cart }: { cart: ProductTicketType[] } = seller;
    const { showSnackBar } = useContext(SnackBarContext)!;

    const dispatch = useDispatch<AppDispatch>();

    const productsTotalPrice: number = cart?.reduce((count: number, product: ProductTicketType) => count + product.price * product.stock_required, 0);
    const ivaPercentage: number = iva;
    const ivaAmount: number = (productsTotalPrice * ivaPercentage) / 100;
    const paymentMethodRef: React.RefObject<PaymentMethodType> = useRef<PaymentMethodType>(PaymentMethod?.Transfer);
    const total: number = productsTotalPrice + ivaAmount;

    const totalUnits: number = useMemo(
      () => cart?.reduce((count: number, product: ProductTicketType) => count + product.stock_required, 0) ?? 0,
      [cart]
    );

    const navigate: NavigateFunction = useNavigate();

    const generateTicket = async (): Promise<void> => {
        const ticket: SellTicketType = {
            _id: crypto.randomUUID(),
            purchase_date: new Date().toLocaleDateString('es-AR',
              {
                day: '2-digit',
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

        localStorage.setItem('last_ticket', JSON.stringify(ticket));
        const response: string | undefined = await dispatch(createSellThunk({ data: ticket }));

        if (!response) {
            showSnackBar(`Ocurrio un error al agregar el producto.`, AlertColor.Error);
            throw new Error('Ocurrio un error registrando la compra, intentalo de nuevo');
        }

        createPdfTicket(ticket);
        await dispatch(cleanCartThunk());
        navigate('/cart-order-confirmed')
    }

    const handleClearCart = (): void => {
        dispatch(cleanCartThunk());
    }

    return (
        <AppLayout fullWidth>
          <Grid
              container
              columnSpacing={3}
          >
             { cart?.length > 0 && (
                  <CartHeaderComponent
                      itemsCount={cart?.length ?? 0}
                      onClearCart={handleClearCart}
                  />
                )}
           
              {/* ─────────── Columna izquierda: header + listado ─────────── */}
              <Grid size={{ xs: 12, md: 9 }} sx={theme => ({ display: 'flex', flexDirection: 'column', })}>
                
                  
                  <CartProductsList cart={cart} />
                  {/* <CartAddMoreProductsComponent onClick={() => navigate('/new-sell')} /> */}
              </Grid>

              {/* ─────────── Columna derecha: resumen de venta ─────────── */}
              <Grid size={{ xs: 12, md: 3 }}>
                  <CartSummaryCardComponent onBack={() => navigate('/new-sell')} onGenerateTicket={generateTicket}>
                      <CartPrice
                          productsTotalPrice={productsTotalPrice}
                          ivaPercentage={ivaPercentage}
                          ivaAmount={ivaAmount}
                          total={total}
                      />
                      <CartPaymentMethod paymentMethodRef={paymentMethodRef} />
                  </CartSummaryCardComponent>
              </Grid>
          </Grid>
        </AppLayout>
    )
};

export default CartPage;