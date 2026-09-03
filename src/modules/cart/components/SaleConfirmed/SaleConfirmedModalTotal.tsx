import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SaleConfirmedModalTotalProps } from "@typings/cart/cartComponentTypes";

// Banda destacada de "Total cobrado" + fila de "Vuelto", el bloque más
// visible del recibo.
const SaleConfirmedModalTotal = ({ formattedTotal, formattedChange }: SaleConfirmedModalTotalProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <>
            <Box
                sx={(theme: Theme) => ({
                    mx: "1.25em",
                    p: "0.75em 0.9em",
                    backgroundColor: theme.custom?.saleTicket?.totalBg,
                    borderTop: `1px solid ${theme.custom?.saleTicket?.totalBorder}`,
                    borderBottom: `1px solid ${theme.custom?.saleTicket?.totalBorder}`,
                })}
            >
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: theme.custom?.saleTicket?.totalLabel,
                    })}
                >
                    {t("cart.orderConfirmed.total.label")}
                </Typography>
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: "2rem",
                        fontWeight: 700,
                        letterSpacing: "-0.02em",
                        lineHeight: 1.15,
                        fontVariantNumeric: "tabular-nums",
                        color: theme.custom?.saleTicket?.text,
                    })}
                >
                    {formattedTotal}
                </Typography>
            </Box>

            <Box sx={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", px: "1.25em", pt: "0.6em", pb: "0.1em" }}>
                <Typography
                    sx={(theme: Theme) => ({
                        fontSize: "0.6875rem",
                        fontWeight: 700,
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        color: theme.custom?.saleTicket?.textMuted,
                    })}
                >
                    {t("cart.orderConfirmed.total.change")}
                </Typography>
                <Typography
                    sx={(theme: Theme) => ({ fontSize: "1.0625rem", fontWeight: 700, fontVariantNumeric: "tabular-nums", color: theme.custom?.saleTicket?.changeColor })}
                >
                    {formattedChange}
                </Typography>
            </Box>
        </>
    );
};

export default SaleConfirmedModalTotal;
