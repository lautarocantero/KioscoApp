import { alpha, Box, type Theme } from "@mui/material";
import { Fragment, memo, type ReactNode } from 'react';
import CartPaymentMethod from './CartPaymentMethod';
import CartSellDataComponent from './CartSellDataComponent';
import CartSummaryFooterComponent from "./CartSummaryFooter";
import CartPaymentStatus from "./CartPaymentStatus";
import type { CartSummaryCardProps } from "@typings/cart/cartComponentTypes";

/*══════════════════════════════════════════════════════════════════════╗
║ Bandas 3 (totales) y 4 (pie fijo) del aside del carrito. Van como     ║
║ hermanos sueltos (Fragment) de la columna flex que arma CartComponent ║
║ — la banda de totales scrollea si no entra, el pie nunca.             ║
╚══════════════════════════════════════════════════════════════════════╝*/
const CartSummaryCardComponent = ({
    onGenerateTicket,
    productsTotalPrice,
    discountAmount,
    globalDiscount,
    onGlobalDiscountChange,
    note,
    onNoteChange,
    ivaPercentage,
    ivaAmount,
    total,
}: CartSummaryCardProps): ReactNode => {

    return (
        <Fragment>
            <Box
                sx={(theme: Theme) => ({
                    flex: '0 1 auto',
                    minHeight: 0,
                    overflowY: 'auto',
                    borderTop: `1px solid ${theme.custom?.darkGray}`,
                    backgroundColor: alpha(theme.palette.primary.main, 0.04),
                    padding: '0.9em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1.2,
                })}
            >
                <CartPaymentMethod total={total} />

                <CartPaymentStatus total={total} />

                <CartSellDataComponent
                    productsTotalPrice={productsTotalPrice}
                    discountAmount={discountAmount}
                    globalDiscount={globalDiscount}
                    onGlobalDiscountChange={onGlobalDiscountChange}
                    note={note}
                    onNoteChange={onNoteChange}
                    ivaPercentage={ivaPercentage}
                    ivaAmount={ivaAmount}
                />
            </Box>

            <Box sx={{ flex: '0 0 auto', p: '0.9em' }}>
                <CartSummaryFooterComponent
                    total={total}
                    onGenerateTicket={onGenerateTicket}
                />
            </Box>
        </Fragment>
    )
}

export default memo(CartSummaryCardComponent);