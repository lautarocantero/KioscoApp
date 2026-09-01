import { Box, IconButton, Typography, type Theme } from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";
import type { SaleConfirmedModalHeaderProps } from "@typings/cart/cartComponentTypes";

const SaleConfirmedModalHeader = ({ onClose }: SaleConfirmedModalHeaderProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center", gap: "1em", p: "1.25em 1.4em 1em" }}>
            <Box
                sx={(theme: Theme) => ({
                    position: "relative",
                    display: "flex",
                    flex: "0 0 auto",
                    filter: `drop-shadow(0 0 2.5em ${theme?.palette?.primary?.main}55)`,
                })}
            >
                <Box
                    component="img"
                    src={getPublicAssetUrl("images/stocko_images/stocko_recipt.png")}
                    alt={t("cart.orderConfirmed.imageAlt")}
                    sx={{ width: { xs: "4.5em", sm: "5.25em" }, height: "auto" }}
                />
                <CheckCircleIcon
                    sx={(theme: Theme) => ({
                        position: "absolute",
                        bottom: "-0.1em",
                        right: "-0.1em",
                        color: theme?.palette?.secondary?.main,
                        backgroundColor: theme?.custom?.darkBackground,
                        borderRadius: "50%",
                        fontSize: "1.75em",
                    })}
                />
            </Box>

            <Box sx={{ flex: 1, minWidth: 0 }}>
                <Typography
                    id="sale-confirmed-modal-title"
                    component="h2"
                    sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontSize: theme?.typography?.h6.fontSize, fontWeight: 600 })}
                >
                    {t("cart.orderConfirmed.modal.title")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, opacity: 0.7, fontSize: theme?.typography?.caption.fontSize })}>
                    {t("cart.orderConfirmed.modal.subtitle")}
                </Typography>
            </Box>

            <IconButton aria-label={t("cart.orderConfirmed.modal.closeAriaLabel")} onClick={onClose} size="small" sx={(theme: Theme) => ({ color: theme?.custom?.fontColor })}>
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default SaleConfirmedModalHeader;
