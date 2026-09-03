import { Formik } from "formik";
import { Box, type Theme } from "@mui/material";
import { Fragment, useCallback, useContext, type ReactNode } from "react";
import { useCart } from "@hooks/cart/useCart";
import { useCartFormik } from "@hooks/cart/useCartFormik";
import { useMascotEyeTracking } from "@hooks/cart/useMascotEyeTracking";
import { useCartClearAnimation } from "@hooks/cart/useCartClearAnimation";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { PRODUCTS_EXHIBITOR_ANCHOR_ID } from "../../../../config/constants";
import { getMascotFaceOpacity } from "../../helpers/getMascotFaceOpacity";
import CartHeaderComponent from "../CartHeader/CartHeaderComponent";
import CartItemsList from "./CartItemsList";
import CartSummaryCardComponent from "./CartSumaryCardComponent";
import CartBagHandles from "./CartBagHandles";
import CartHandGrab from "./CartHandGrab";
import CartMascotFace from "./CartMascotFace";
import SaleConfirmedModal from "../SaleConfirmed/SaleConfirmedModal";
import SaleConfirmedFlashOverlay from "../SaleConfirmed/SaleConfirmedFlashOverlay";

const noop = (): void => {};

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
        printTicket,
        handleClearCart,
        handleIncreaseProduct,
        handleDecreaseProduct,
        handleItemDiscountChange,
        handleGlobalDiscountChange,
        handleNoteChange,
        ticketSummary,
        goToTicketDetail,
        isSaleConfirmedModalOpen,
        saleConfirmedModalProgress,
        saleConfirmedModalRemainingSeconds,
        isSaleConfirmedModalPaused,
        closeSaleConfirmedModal,
        pauseSaleConfirmedModal,
        resumeSaleConfirmedModal,
    } = useCart(showSnackBar);

    const { initialValues, validationSchema } = useCartFormik(total);
    const isEmpty = (cart?.length ?? 0) === 0;
    const { containerRef, eyeOffset } = useMascotEyeTracking();
    const { bagStyle, handStyle, handlesStyle, runBagAnimation } = useCartClearAnimation();

    const triggerClear = useCallback((): void => {
        runBagAnimation(handleClearCart);
    }, [runBagAnimation, handleClearCart]);

    return (
        <Fragment>
            <Box
                ref={containerRef}
                sx={{
                    position: { xs: "relative", md: "sticky" },
                    top: { md: "1em" },
                    maxHeight: { md: "calc(100vh - 2em)" },
                    width: "100%",
                    mt: "4.25em",
                    transform: bagStyle.transform,
                    opacity: bagStyle.opacity,
                    transition: `transform ${bagStyle.transitionDuration} cubic-bezier(.4,0,.2,1), opacity ${bagStyle.transitionDuration} ease`,
                }}
            >
                <CartHandGrab style={handStyle} />
                <CartBagHandles style={handlesStyle} />

                <Box
                    component="aside"
                    id={PRODUCTS_EXHIBITOR_ANCHOR_ID}
                    sx={(theme: Theme) => ({
                        position: "relative",
                        display: "flex",
                        flexDirection: "column",
                        minHeight: 0,
                        minWidth: 0,
                        backgroundColor: theme.custom?.background,
                        border: `1px solid ${theme.custom?.darkGray}`,
                        borderRadius: "14px",
                        overflow: "hidden",
                    })}
                >
                    <CartMascotFace eyeOffset={eyeOffset} opacity={getMascotFaceOpacity(isEmpty)} />

                    <Box sx={{ position: "relative", flex: "0 0 auto", padding: "0.75em 0.9em" }}>
                        <CartHeaderComponent
                            itemsCount={cart?.length ?? 0}
                            onClearCart={triggerClear}
                        />
                    </Box>

                    <Box
                        sx={(theme: Theme) => ({
                            position: "relative",
                            flex: "1 1 auto",
                            // Vacío: alto generoso para que el texto, la mascota (a tamaño
                            // completo, pintada por el padre) y el cierre de la bolsa queden
                            // cómodamente esparcidos en vez de amontonados.
                            minHeight: isEmpty ? "30em" : "6em",
                            maxHeight: isEmpty ? "none" : "40vh",
                            overflowY: isEmpty ? "visible" : "auto",
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

                    {!isEmpty && (
                        <Formik
                            initialValues={initialValues}
                            validationSchema={validationSchema}
                            onSubmit={(formValues) => {
                                // Recién se llama tras pasar la validación: la bolsa "sale de
                                // cuadro" en paralelo al alta real de la venta (el vaciado
                                // efectivo del carrito ya lo hace generateTicket vía Redux).
                                runBagAnimation(noop);
                                return generateTicket(formValues);
                            }}
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
                    )}
                </Box>
            </Box>

            <SaleConfirmedFlashOverlay open={isSaleConfirmedModalOpen} />

            <SaleConfirmedModal
                open={isSaleConfirmedModalOpen}
                progress={saleConfirmedModalProgress}
                remainingSeconds={saleConfirmedModalRemainingSeconds}
                isPaused={isSaleConfirmedModalPaused}
                ticketSummary={ticketSummary}
                onClose={closeSaleConfirmedModal}
                onPause={pauseSaleConfirmedModal}
                onResume={resumeSaleConfirmedModal}
                onPrintTicket={printTicket}
                goToTicketDetail={goToTicketDetail}
            />
        </Fragment>
    )
};

export default CartComponent;
