import { useTheme, type Theme } from "@mui/material";
import { useId, type ReactNode } from "react";
import type { CartMascotFaceProps } from "@typings/cart/cartComponentTypes";

// Cara de la mascota de la bolsa: cejas, ojos (siguen el mouse) y boca.
// A opacidad 1 es la ilustración del estado vacío; a opacidad baja queda
// como marca de agua detrás del contenido cuando el carrito tiene ítems.
const CartMascotFace = ({ eyeOffset, opacity }: CartMascotFaceProps): ReactNode => {
    const theme: Theme = useTheme();
    const clipId = useId();
    const faceColor = theme.custom?.cartBag?.face;

    return (
        <svg
            viewBox="10 66 360 412"
            preserveAspectRatio="xMidYMax meet"
            aria-hidden="true"
            focusable="false"
            style={{
                position: "absolute",
                left: 0,
                bottom: "80px",
                width: "100%",
                height: "322px",
                opacity,
                transition: "opacity 0.45s ease",
                pointerEvents: "none",
            }}
        >
            <defs>
                <clipPath id={clipId}>
                    <path d="M22 280 C104 324 276 324 358 280 A168 172 0 0 1 22 280 Z" />
                </clipPath>
            </defs>

            <path d="M46 106 C64 74 104 70 124 92" fill="none" stroke={faceColor} strokeWidth={27} strokeLinecap="round" />
            <path d="M256 92 C276 70 316 74 334 106" fill="none" stroke={faceColor} strokeWidth={27} strokeLinecap="round" />

            <g transform={`translate(${eyeOffset.x}, ${eyeOffset.y})`}>
                <rect x={66} y={132} width={47} height={122} rx={23.5} fill={faceColor} />
                <rect x={267} y={132} width={47} height={122} rx={23.5} fill={faceColor} />
            </g>

            <path d="M22 280 C104 324 276 324 358 280 A168 172 0 0 1 22 280 Z" fill={faceColor} />
            <path d="M64 296 C112 336 268 336 316 296 C308 360 72 360 64 296 Z" fill={theme.custom?.background} />

            <g clipPath={`url(#${clipId})`}>
                <ellipse cx={190} cy={440} rx={104} ry={64} fill={theme.palette.primary.main} />
            </g>
        </svg>
    );
};

export default CartMascotFace;
