import { Formik } from "formik";
import { Box, type Theme } from "@mui/material";
import { useContext, type ReactNode } from "react";
import { useCart } from "@hooks/cart/useCart";
import { useCartFormik } from "@hooks/cart/useCartFormik";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../../../config/constants";
import CartHeaderComponent from "../CartHeader/CartHeaderComponent";
import CartItemsList from "./CartItemsList";
import CartSummaryCardComponent from "./CartSumaryCardComponent";

const CartComponent = (): ReactNode => {
    const { showSnackBar } = useContext(SnackBarContext)!;

    const {
        cart,
        productsTotalPrice,
        discountAmount,
        globalDiscount,
        note,
        ivaPercentage,
        ivaAmount,
        total,
        generateTicket,
        handleClearCart,
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleItemDiscountChange,
        handleGlobalDiscountChange,
        handleNoteChange,
    } = useCart(showSnackBar);

    const { initialValues, validationSchema } = useCartFormik(total);

    return (
        <Box
            component="aside"
            id={PRODUCTS_EXHIBITOR_ANCHOR_ID}
            sx={(theme: Theme) => ({
                display: "flex",
                flexDirection: "column",
                minHeight: 0,
                minWidth: 0,
                backgroundColor: theme.custom?.background,
                border: `1px solid ${theme.custom?.darkGray}`,
                borderRadius: "14px",
                overflow: "hidden",
                position: { md: "sticky" },
                top: { md: "1em" },
                maxHeight: { md: "calc(100vh - 2em)" },
                width: "100%",
            })}
        >
            <Box sx={{ flex: "0 0 auto", padding: "0.75em 0.9em" }}>
                <CartHeaderComponent
                    itemsCount={cart?.length ?? 0}
                    onClearCart={handleClearCart}
                />
            </Box>

            <Box
                sx={(theme: Theme) => ({
                    flex: "1 1 auto",
                    minHeight: "6em",
                    maxHeight: "40vh",
                    overflowY: "auto",
                    padding: "0 0.5em",
                    borderTop: `1px solid ${theme.custom?.darkGray}`,
                })}
            >
                <CartItemsList
                    cart={cart}
                    onIncrease={handleIncreaseProduct}
                    onDecrease={handleDecreaseProduct}
                    onItemDiscountChange={handleItemDiscountChange}
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
                        onGenerateTicket={formikSubmit}
                        productsTotalPrice={productsTotalPrice}
                        discountAmount={discountAmount}
                        globalDiscount={globalDiscount}
                        onGlobalDiscountChange={handleGlobalDiscountChange}
                        note={note}
                        onNoteChange={handleNoteChange}
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
