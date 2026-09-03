import { Box, Typography, useTheme, type Theme } from "@mui/material";
import { type ReactNode } from "react";
import type { SaleConfirmedBarcodeProps } from "@typings/cart/cartComponentTypes";

// Barras decorativas (no codifican `code` realmente) + el número de ticket
// debajo, como en un recibo impreso.
const BAR_WIDTHS = [3, 1, 4, 1, 2, 5, 1, 3, 2, 4, 1, 3, 5, 1, 2, 4, 1, 3, 2, 5, 1, 3, 2, 4, 1, 2, 5, 1, 3, 2, 4, 1, 3, 5, 1, 2, 4, 1, 3, 2, 5, 1, 3, 2, 4];

const SaleConfirmedBarcode = ({ code }: SaleConfirmedBarcodeProps): ReactNode => {
    const theme: Theme = useTheme();
    let x = 2;
    const bars = BAR_WIDTHS.map((width, index) => {
        const bar = { key: index, x, width };
        x += width + (index % 3 === 0 ? 6 : 4);
        return bar;
    });

    return (
        <Box sx={{ px: "20px", pb: "6px" }}>
            <svg
                viewBox="0 0 300 46"
                preserveAspectRatio="none"
                aria-hidden="true"
                focusable="false"
                style={{ display: "block", width: "100%", height: "44px" }}
            >
                <g fill={theme.custom?.saleTicket?.text}>
                    {bars.map(({ key, x: barX, width }) => (
                        <rect key={key} x={barX} y={0} width={width} height={46} />
                    ))}
                </g>
            </svg>
            <Typography
                sx={(theme: Theme) => ({
                    textAlign: "center",
                    fontSize: "0.625rem",
                    letterSpacing: "0.22em",
                    color: theme.custom?.saleTicket?.textMuted,
                    pt: "4px",
                })}
            >
                {code}
            </Typography>
        </Box>
    );
};

export default SaleConfirmedBarcode;
