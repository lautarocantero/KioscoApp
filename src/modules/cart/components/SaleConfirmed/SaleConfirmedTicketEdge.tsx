import { useTheme, type Theme } from "@mui/material";
import { type ReactNode } from "react";
import type { SaleConfirmedTicketEdgeProps } from "@typings/cart/cartComponentTypes";

const TOP_PATH = "M0 11 L15.5 0 L31 11 L46.5 0 L62 11 L77.5 0 L93 11 L108.5 0 L124 11 L139.5 0 L155 11 L170.5 0 L186 11 L201.5 0 L217 11 L232.5 0 L248 11 L263.5 0 L279 11 L294.5 0 L310 11 L325.5 0 L341 11 L356.5 0 L372 11 Z";
const BOTTOM_PATH = "M0 0 L15.5 11 L31 0 L46.5 11 L62 0 L77.5 11 L93 0 L108.5 11 L124 0 L139.5 11 L155 0 L170.5 11 L186 0 L201.5 11 L217 0 L232.5 11 L248 0 L263.5 11 L279 0 L294.5 11 L310 0 L325.5 11 L341 0 L356.5 11 L372 0 Z";

// El borde dentado (troquel de recibo) arriba y abajo del ticket blanco de
// SaleConfirmedModal. `flipped` elige el zig-zag de abajo (mismo patrón,
// invertido en Y) del de arriba.
const SaleConfirmedTicketEdge = ({ flipped = false }: SaleConfirmedTicketEdgeProps): ReactNode => {
    const theme: Theme = useTheme();

    return (
        <svg
            viewBox="0 0 372 11"
            preserveAspectRatio="none"
            aria-hidden="true"
            focusable="false"
            style={{ display: "block", width: "100%", height: "11px" }}
        >
            <path d={flipped ? BOTTOM_PATH : TOP_PATH} fill={theme.custom?.saleTicket?.paper} />
        </svg>
    );
};

export default SaleConfirmedTicketEdge;
