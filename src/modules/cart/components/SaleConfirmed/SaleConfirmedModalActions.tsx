import { Box, Button, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import PrintIcon from "@mui/icons-material/Print";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { SaleConfirmedModalActionsProps } from "@typings/cart/cartComponentTypes";

const actionButtonSx = (theme: Theme) => ({
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "0.5em",
    padding: "0.75em 0.8em",
    border: `1px solid ${alpha(theme.palette.primary.main, 0.5)}`,
    borderRadius: "8px",
    backgroundColor: theme.custom?.saleTicket?.paper,
    color: theme.palette.primary.main,
    textTransform: "none" as const,
    fontSize: "0.8125rem",
    fontWeight: 600,
    "&:hover": { backgroundColor: alpha(theme.palette.primary.main, 0.1) },
});

const SaleConfirmedModalActions = ({
    onPrintTicket,
    goToTicketDetail,
    remainingSeconds,
    isPaused,
}: SaleConfirmedModalActionsProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{ display: "flex", gap: "0.65em", px: "1.25em", pt: "0.5em", pb: "0.25em" }}>
                <Button onClick={onPrintTicket} sx={actionButtonSx}>
                    <PrintIcon sx={{ fontSize: "0.95rem" }} />
                    {t("cart.orderConfirmed.actions.printTicket")}
                </Button>
                <Button onClick={goToTicketDetail} sx={actionButtonSx}>
                    <VisibilityIcon sx={{ fontSize: "0.95rem" }} />
                    {t("cart.orderConfirmed.actions.viewDetail")}
                </Button>
            </Box>

            <Box sx={{ display: "flex", justifyContent: "center", px: "1.25em", pt: "0.4em", pb: "0.5em" }}>
                <Typography sx={(theme: Theme) => ({ fontSize: "0.625rem", letterSpacing: "0.04em", color: theme.custom?.saleTicket?.textMuted })}>
                    {isPaused
                        ? t("cart.orderConfirmed.autoClose.paused")
                        : t("cart.orderConfirmed.autoClose.countdown", { seconds: remainingSeconds })}
                </Typography>
            </Box>
        </>
    );
};

export default SaleConfirmedModalActions;
