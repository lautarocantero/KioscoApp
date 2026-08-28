import { Formik } from "formik";
import { Box, type Theme } from "@mui/material";
import { useContext, useMemo, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useCart } from "@hooks/cart/useCart";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { cartFormSchema, getCartFormInitialValues } from "../../schema/CartFormSchema";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../../../config/constants";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import CartHeaderComponent from "../CartHeader/CartHeaderComponent";
import CartItemsList from "./CartItemsList";
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
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleSubtotalChange,
        handleQuantityChange,
    } = useCart(showSnackBar);

    const initialValues = useMemo(() => getCartFormInitialValues(), []);
    const validationSchema = useMemo(() => cartFormSchema(total, t), [total, t]);

    return (
        <Box
            component="aside"
            id={PRODUCTS_EXHIBITOR_ANCHOR_ID}
            sx={(theme: Theme) => ({
                ...getNoisyBackgroundSx({ theme }),
                display: "flex",
                flexDirection: "column",
                gap: 1.5,
                border: `1px solid ${theme?.palette?.primary?.main}`,
                borderRadius: "0.5em",
                padding: "1.2em",
                position: { md: "sticky" },
                top: { md: "1em" },
                maxHeight: { md: "calc(100vh - 2em)" },
                width: "100%",
            })}
        >
            <CartHeaderComponent
                itemsCount={cart?.length ?? 0}
                onClearCart={handleClearCart}
            />

            <Box sx={{ flex: "1 1 auto", minHeight: 0, overflowY: "auto" }}>
                <CartItemsList
                    cart={cart}
                    onIncrease={handleIncreaseProduct}
                    onDecrease={handleDecreaseProduct}
                    onSubtotalChange={handleSubtotalChange}
                    onQuantityChange={handleQuantityChange}
                />
            </Box>

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
        </Box>
    )
};

export default CartComponent;
