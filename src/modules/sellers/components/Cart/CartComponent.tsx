import { Formik } from "formik";
import { Grid } from "@mui/material";
import { useContext, useMemo, type ReactNode } from "react";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { useCart } from "@hooks/sellers/useCart";
import { cartFormSchema, getCartFormInitialValues } from "../../schema/CartFormSchema";
import CartHeaderComponent from "../../../cart/components/CartHeader/CartHeaderComponent";
import CartProductTableComponent from "../../../cart/components/CartProductTableComponent";
import CartSummaryCardComponent from '../../../cart/components/CartSumaryCardComponent';

const CartComponent = (): ReactNode => {
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

    const initialValues = useMemo(() => getCartFormInitialValues(), []);
    const validationSchema = useMemo(() => cartFormSchema(total), [total]);

    return (
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
            <CartProductTableComponent cart={cart} columns={columns} />

            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
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
    )
};

export default CartComponent;