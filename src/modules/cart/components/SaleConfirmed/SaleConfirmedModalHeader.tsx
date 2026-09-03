import { Box, IconButton, Typography, type Theme } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SaleConfirmedModalHeaderProps } from "@typings/cart/cartComponentTypes";

const SaleConfirmedModalHeader = ({ onClose }: SaleConfirmedModalHeaderProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box sx={{ display: "flex", alignItems: "center", gap: "0.7em", p: "1em 1.25em 0.9em" }}>
            <Box
                sx={(theme: Theme) => ({
                    flex: "0 0 auto",
                    width: "26px",
                    height: "26px",
                    borderRadius: "50%",
                    backgroundColor: theme.custom?.saleTicket?.checkColor,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                })}
            >
                <CheckIcon sx={{ fontSize: "1.1rem", color: "#FFFFFF" }} />
            </Box>

            <Typography
                id="sale-confirmed-modal-title"
                component="h2"
                sx={(theme: Theme) => ({
                    flex: 1,
                    minWidth: 0,
                    fontSize: "1.0625rem",
                    fontWeight: 700,
                    letterSpacing: "-0.01em",
                    color: theme.custom?.saleTicket?.text,
                })}
            >
                {t("cart.orderConfirmed.modal.title")}
            </Typography>

            <IconButton
                aria-label={t("cart.orderConfirmed.modal.closeAriaLabel")}
                onClick={onClose}
                size="small"
                sx={(theme: Theme) => ({
                    color: theme.custom?.saleTicket?.textMuted,
                    "&:hover": { backgroundColor: theme.custom?.saleTicket?.divider },
                })}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </Box>
    );
};

export default SaleConfirmedModalHeader;
