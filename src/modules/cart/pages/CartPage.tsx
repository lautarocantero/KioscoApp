import { Formik } from "formik";
import { Grid } from "@mui/material";
import AppLayout from "../../shared/layout/AppLayout";
import { SnackBarContext } from '../../shared/components/SnackBar/SnackBarContext';
import CartHeaderComponent from '../components/CartHeader/CartHeaderComponent';
import CartSummaryCardComponent from '../components/CartSumaryCardComponent';
import CartProductTable from "../components/CartProductTableComponent";
import { useCart } from "../../../hooks/sellers/useCart";
import { useContext, type ReactNode } from "react";
import { cartFormSchema, getCartFormInitialValues } from "../../sells/schema/CartFormSchema";

const CartPage = (): ReactNode => {
    const { showSnackBar } = useContext(SnackBarContext)!;

    const {
        cart,
        productsTotalPrice,
        ivaPercentage,
        ivaAmount,
        total,
        generateTicket,
        handleClearCart,
        goBackToSell,
        columns
    } = useCart(showSnackBar);

    return (
        <AppLayout fullWidth>
            <Grid
                container
                columnSpacing={2}
                rowSpacing={2}
                sx={{ width: "100%" }}
            >
                <CartHeaderComponent
                    itemsCount={cart?.length ?? 0}
                    onClearCart={handleClearCart}
                />
                <CartProductTable cart={cart} columns={columns} />

                <Formik
                    initialValues={getCartFormInitialValues()}
                    validationSchema={cartFormSchema(total)}
                    onSubmit={generateTicket}
                    validateOnBlur={false}
                    validateOnChange={false}
                    enableReinitialize
                >
                    {({ handleSubmit: formikSubmit }) => (
                        <CartSummaryCardComponent
                            onBack={goBackToSell}
                            onGenerateTicket={formikSubmit}
                            productsTotalPrice={productsTotalPrice}
                            ivaPercentage={ivaPercentage}
                            ivaAmount={ivaAmount}
                            total={total}
                        />
                    )}
                </Formik>
            </Grid>
        </AppLayout>
    )
};

export default CartPage;