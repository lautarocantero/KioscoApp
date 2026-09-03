import { useTheme, type Theme } from "@mui/material";
import { type ReactNode } from "react";
import type { CartHandGrabProps } from "@typings/cart/cartComponentTypes";

// La mano que "agarra" las asas de la bolsa durante useCartClearAnimation.
// `style` (transform/opacity) la mueve entre oculta, agarrando y levantada.
const CartHandGrab = ({ style }: CartHandGrabProps): ReactNode => {
    const theme: Theme = useTheme();

    return (
        <svg
            viewBox="0 0 300 240"
            aria-hidden="true"
            focusable="false"
            style={{
                position: "absolute",
                top: "-166px",
                left: "50%",
                marginLeft: "-102px",
                width: "300px",
                height: "240px",
                overflow: "visible",
                zIndex: 3,
                transition: "transform 0.36s cubic-bezier(.22,.75,.25,1), opacity 0.22s ease",
                ...style,
            }}
        >
            <path d="M176 132 L286 20 L322 58 L212 170 Z" fill={theme.custom?.darkMain} />
            <path d="M176 132 L286 20 L296 30 L186 142 Z" fill={theme.custom?.lightMain} />
            <rect x={118} y={66} width={104} height={88} rx={34} fill={theme.custom?.cartBag?.face} />
            <rect x={62} y={70} width={88} height={20} rx={10} fill={theme.custom?.cartBag?.face} />
            <rect x={58} y={94} width={94} height={21} rx={10.5} fill={theme.custom?.cartBag?.face} />
            <rect x={62} y={119} width={88} height={20} rx={10} fill={theme.custom?.cartBag?.face} />
            <rect x={70} y={142} width={76} height={18} rx={9} fill={theme.custom?.cartBag?.face} />
            <rect x={96} y={34} width={82} height={22} rx={11} fill={theme.custom?.cartBag?.face} transform="rotate(-24 96 34)" />
        </svg>
    );
};

export default CartHandGrab;
