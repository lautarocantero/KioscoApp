import { Box, Button, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import type { CartSummaryFooterProps } from '@typings/cart/cartComponentTypes';
import { CART_GENERATE_TICKET_BUTTON_ID } from '../../../../config/constants';
import { formatCurrency } from '../../helpers/formatCurrency';


const CartSummaryFooterComponent = ({ total, onGenerateTicket }: CartSummaryFooterProps): ReactNode => {
    const { t } = useTranslation();
    const isEmpty = total <= 0;

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1, width: '100%' }}>
            <Box sx={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
                <Typography sx={(theme: Theme) => ({ fontSize: theme.typography?.body2?.fontSize, fontWeight: 600, color: theme.custom?.darkWhite })}>
                    {t("cart.summary.total")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ fontSize: "1.75rem", fontWeight: 700, letterSpacing: "-0.02em", fontVariantNumeric: "tabular-nums", color: theme.custom?.fontColor })}>
                    {formatCurrency(total)}
                </Typography>
            </Box>

            <Button
                id={CART_GENERATE_TICKET_BUTTON_ID}
                onClick={() => onGenerateTicket?.()}
                disabled={isEmpty}
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.6em',
                    width: '100%',
                    padding: '0.8em 1em',
                    borderRadius: '10px',
                    textTransform: 'none',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    backgroundColor: theme.palette.primary.main,
                    color: theme.custom?.white,
                    boxShadow: `0 4px 12px ${theme.palette.primary.main}48`,
                    '&:hover': { backgroundColor: theme.palette.primary.dark },
                    '&.Mui-disabled': { opacity: 0.45, color: theme.custom?.white },
                })}
            >
                {t("cart.summary.generateTicket")}
                <Box component="span" sx={{ fontSize: '0.7rem', opacity: 0.8 }}>F9</Box>
            </Button>
        </Box>
    )
}

export default CartSummaryFooterComponent;
