import { alpha, Grid, type Theme } from "@mui/material";
import { memo, type ReactNode } from 'react';
import CartPaymentMethod from './CartPaymentMethod';
import CartSellDataComponent from './CartSellDataComponent';
import CartSummaryFooterComponent from "./CartSummaryFooter";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import CartPaymentStatus from "./CartPaymentStatus";
import type { CartSummaryCardProps } from "@typings/seller/sellerComponentTypes";


const CartSummaryCardComponent = ({ 
    onBack,
    onGenerateTicket, 
    productsTotalPrice,
    ivaPercentage,
    ivaAmount,
    total,
}: CartSummaryCardProps): ReactNode => {

    return (
        <Grid 
            container
            size={{ xs: 12, md: 4 }}
            sx={(theme: Theme) => ({
                ...getNoisyBackgroundSx({theme}),
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: `1px solid ${theme?.palette?.primary?.main}`,
                boxShadow: `0 0 0.6em ${alpha(theme?.palette?.primary?.main, 0.25)}`,
                borderRadius: '0.3em',
                padding: '1.5em',
                position: { md: 'sticky' },
                top: { md: '2em' },
                
            })}
        >

            <CartSellDataComponent
                productsTotalPrice={productsTotalPrice}
                ivaPercentage={ivaPercentage}
                ivaAmount={ivaAmount}
                total={total}
            />

            <CartPaymentMethod total={total} />

            <CartPaymentStatus total={total}  />

            <CartSummaryFooterComponent
                total={total}
                onBack={onBack}
                onGenerateTicket={onGenerateTicket}
            />
        </Grid>
    )
}

export default memo(CartSummaryCardComponent);