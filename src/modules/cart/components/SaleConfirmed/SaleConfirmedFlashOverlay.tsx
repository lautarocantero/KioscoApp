import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import type { SaleConfirmedFlashOverlayProps } from "@typings/cart/cartComponentTypes";

const FLASH_ANIMATION = "sale-confirmed-flash-in 1.1s cubic-bezier(.2,.9,.2,1) both";
const RING_ANIMATION = "sale-confirmed-ring-out 1.1s cubic-bezier(.2,.8,.3,1) both";

// Flash verde a pantalla completa tipo e-commerce, disparado junto con
// SaleConfirmedModal (mismo `open`): un tinte sólido, un halo radial y un
// anillo que se expande y se desvanece — puramente decorativo.
const SaleConfirmedFlashOverlay = ({ open }: SaleConfirmedFlashOverlayProps): ReactNode => {
    if (!open) return null;

    return (
        <Box aria-hidden="true" sx={{ position: "fixed", inset: 0, zIndex: 1200, pointerEvents: "none" }}>
            <Box
                sx={(theme: Theme) => ({
                    position: "absolute",
                    inset: 0,
                    backgroundColor: theme.palette.success.main,
                    animation: FLASH_ANIMATION,
                    "@keyframes sale-confirmed-flash-in": {
                        "0%": { opacity: 0 },
                        "12%": { opacity: 1 },
                        "100%": { opacity: 0.42 },
                    },
                })}
            />
            <Box
                sx={(theme: Theme) => ({
                    position: "absolute",
                    inset: 0,
                    background: `radial-gradient(circle at 50% 100%, ${alpha(theme.palette.success.main, 0.85)} 0%, ${alpha(theme.palette.success.main, 0.35)} 45%, ${alpha(theme.custom.darkblack, 0.35)} 85%)`,
                    animation: FLASH_ANIMATION,
                })}
            />
            <Box
                sx={(theme: Theme) => ({
                    position: "absolute",
                    top: "100%",
                    left: "50%",
                    width: "640px",
                    height: "640px",
                    margin: "-320px 0 0 -320px",
                    borderRadius: "50%",
                    border: `5px solid ${alpha(theme.custom.white, 0.5)}`,
                    animation: RING_ANIMATION,
                    "@keyframes sale-confirmed-ring-out": {
                        "0%": { transform: "scale(0.2)", opacity: 0.85 },
                        "100%": { transform: "scale(2.6)", opacity: 0 },
                    },
                })}
            />
        </Box>
    );
};

export default SaleConfirmedFlashOverlay;
