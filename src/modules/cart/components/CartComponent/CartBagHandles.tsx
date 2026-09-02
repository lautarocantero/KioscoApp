import { useTheme, type Theme } from "@mui/material";
import { type ReactNode } from "react";

// Las dos asas de la bolsa del carrito, ancladas arriba del card.
const CartBagHandles = (): ReactNode => {
    const theme: Theme = useTheme();

    return (
        <svg
            viewBox="0 0 380 78"
            aria-hidden="true"
            focusable="false"
            style={{ position: "absolute", top: "-62px", left: 0, width: "100%", height: "78px", display: "block", overflow: "visible" }}
        >
            <path
                d="M120 76 C120 18 148 6 190 6 C232 6 260 18 260 76"
                fill="none"
                stroke={theme.custom?.cartBag?.handlePrimary}
                strokeWidth={17}
                strokeLinecap="round"
            />
            <path
                d="M152 76 C152 34 168 24 190 24 C212 24 228 34 228 76"
                fill="none"
                stroke={theme.custom?.cartBag?.handleSecondary}
                strokeWidth={15}
                strokeLinecap="round"
            />
        </svg>
    );
};

export default CartBagHandles;
