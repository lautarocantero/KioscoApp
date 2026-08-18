import { Formik } from "formik";
import { Grid } from "@mui/material";
import { useContext, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@hooks/cart/useCart";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { cartFormSchema, getCartFormInitialValues } from "../../schema/CartFormSchema";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../../../config/constants";
import CartHeaderComponent from "../CartHeader/CartHeaderComponent";
import CartProductTableComponent from "./CartProductTableComponent";
import CartSummaryCardComponent from "./CartSumaryCardComponent";

const CartComponent = (): ReactNode => {
    const { t } = useTranslation();
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
    const validationSchema = useMemo(() => cartFormSchema(total, t), [total, t]);

    return (
        <Grid
            container
            columnSpacing={2}
            rowSpacing={2}
            sx={{ width: "100%" }}
            id={PRODUCTS_EXHIBITOR_ANCHOR_ID}
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