import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

// Franja de marca del ticket: mascota de Stocko + wordmark + tagline, entre
// los dos divisores punteados de SaleConfirmedModal.
const SaleConfirmedBrandStrip = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.75em", p: "1em 1.25em 0.9em" }}>
            <Box
                component="img"
                src={getPublicAssetUrl("images/logo/Stocko-mascotCircle-happy.png")}
                alt={t("cart.orderConfirmed.brand.alt")}
                sx={{
                    flex: "0 0 auto",
                    width: "3.9em",
                    height: "3.9em",
                    animation: "sale-confirmed-brand-bump 0.8s ease 0.18s both",
                    "@keyframes sale-confirmed-brand-bump": {
                        "0%, 100%": { transform: "none" },
                        "40%": { transform: "translateY(-3px)" },
                    },
                }}
            />

            <Box>
                <Box sx={{ display: "flex", alignItems: "baseline", gap: "1px", fontSize: "1.6rem", fontWeight: 700, letterSpacing: "0.02em", lineHeight: 1 }}>
                    <Box component="span" sx={(theme: Theme) => ({ color: theme.custom?.saleTicket?.text })}>STOK</Box>
                    <Box component="span" sx={(theme: Theme) => ({ color: theme.palette.primary.main })}>O</Box>
                </Box>
                <Typography sx={(theme: Theme) => ({ fontSize: "0.6875rem", color: theme.custom?.saleTicket?.textMuted, letterSpacing: "0.01em" })}>
                    {t("cart.orderConfirmed.brand.tagline")}
                </Typography>
            </Box>
        </Box>
    );
};

export default SaleConfirmedBrandStrip;
