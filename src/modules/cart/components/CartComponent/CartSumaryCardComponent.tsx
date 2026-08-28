import { Box, type Theme } from "@mui/material";
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
    onBack,
    onGenerateTicket,
    productsTotalPrice,
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
                    pt: '1em',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 1,
                })}
            >
                <CartSellDataComponent
                    productsTotalPrice={productsTotalPrice}
                    ivaPercentage={ivaPercentage}
                    ivaAmount={ivaAmount}
                    total={total}
                />

                <CartPaymentMethod total={total} />

                <CartPaymentStatus total={total} />
            </Box>

            <Box sx={{ flex: '0 0 auto', pt: 1 }}>
                <CartSummaryFooterComponent
                    total={total}
                    onBack={onBack}
                    onGenerateTicket={onGenerateTicket}
                />
            </Box>
        </Fragment>
    )
}

export default memo(CartSummaryCardComponent);