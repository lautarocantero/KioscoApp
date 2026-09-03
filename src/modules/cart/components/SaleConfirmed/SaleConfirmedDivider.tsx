import { Box, type Theme } from "@mui/material";
import { type ReactNode } from "react";

// Línea punteada (perforado de ticket) entre secciones del recibo.
const SaleConfirmedDivider = (): ReactNode => (
    <Box
        aria-hidden="true"
        sx={(theme: Theme) => ({
            height: "1px",
            mx: "20px",
            background: `repeating-linear-gradient(to right, ${theme.custom?.saleTicket?.divider} 0 5px, transparent 5px 10px)`,
        })}
    />
);

export default SaleConfirmedDivider;
