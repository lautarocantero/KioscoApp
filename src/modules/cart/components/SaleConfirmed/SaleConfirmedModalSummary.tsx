import { Box, type Theme } from "@mui/material";
import { type ReactNode } from "react";
import type { SaleConfirmedModalSummaryProps } from "@typings/cart/cartComponentTypes";
import { getSaleConfirmedSummaryFields } from "./getSaleConfirmedSummaryFields";

// Grilla N° de ticket / fecha / vendedor, como el detalle de un recibo.
const SaleConfirmedModalSummary = ({ ticketSummary }: SaleConfirmedModalSummaryProps): ReactNode => {
    const { rows } = getSaleConfirmedSummaryFields(ticketSummary);

    return (
        <Box component="dl" sx={{ m: 0, p: "0.9em 1.25em 0.75em", display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.5em 0.9em" }}>
            {rows.map(({ id, label, value }) => (
                <Box key={id} sx={{ display: "contents" }}>
                    <Box component="dt" sx={(theme: Theme) => ({ fontSize: "0.8125rem", color: theme.custom?.saleTicket?.textMuted })}>
                        {label}
                    </Box>
                    <Box
                        component="dd"
                        sx={(theme: Theme) => ({
                            m: 0,
                            fontSize: "0.8125rem",
                            fontWeight: 600,
                            textAlign: "right",
                            fontVariantNumeric: "tabular-nums",
                            color: theme.custom?.saleTicket?.text,
                        })}
                    >
                        {value}
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default SaleConfirmedModalSummary;
