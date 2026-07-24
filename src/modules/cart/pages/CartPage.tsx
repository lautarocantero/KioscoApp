import { Grid } from "@mui/material";
import { useContext, type ReactNode } from "react";
import AppLayout from "../../shared/layout/AppLayout";
import CartPaymentMethod from "../components/CartPaymentMethod";
import CartPrice from "../components/CartPriceComponent";
import CartProductsList from "../components/CartProductsListComponent";
import { SnackBarContext } from '../../shared/components/SnackBar/SnackBarContext';
import CartHeaderComponent from '../components/CartHeaderComponent';
import CartSummaryCardComponent from '../components/CartSumaryCardComponent';
import { useCart } from "../../../hooks/sells/useCart";

const CartPage = (): ReactNode => {
    const { showSnackBar } = useContext(SnackBarContext)!;

    const {
        cart,
        productsTotalPrice,
        ivaPercentage,
        ivaAmount,
        total,
        paymentMethodRef,
        generateTicket,
        handleClearCart,
        goBackToSell,
    } = useCart(showSnackBar);

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
                  <CartSummaryCardComponent onBack={goBackToSell} onGenerateTicket={generateTicket}>
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