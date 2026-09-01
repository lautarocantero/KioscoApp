import PrintIcon from "@mui/icons-material/Print";
import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import PrimaryButtonComponent from "../../../shared/components/Buttons/PrimaryButtonComponent";
import EmptyButton from "../../../shared/components/Buttons/EmptyButton";
import type { SaleConfirmedModalActionsProps } from "@typings/cart/cartComponentTypes";

const SaleConfirmedModalActions = ({
    onPrintTicket,
    goToTicketDetail,
    remainingSeconds,
    isPaused,
}: SaleConfirmedModalActionsProps): ReactNode => {
    const { t } = useTranslation();

    return (
        <>
            <Box sx={{ position: "relative", zIndex: 1, display: "flex", flexDirection: { xs: "column", sm: "row" }, gap: "0.8em", p: "0 1.4em 0.9em" }}>
                <PrimaryButtonComponent
                    buttonText={t("cart.orderConfirmed.actions.printTicket")}
                    buttonOnClick={onPrintTicket}
                    buttonWidth="100%"
                    marginTop="0"
                    icon={<PrintIcon fontSize="small" sx={{ mr: 1 }} />}
                />
                <EmptyButton
                    buttonText={t("cart.orderConfirmed.actions.viewDetail")}
                    buttonOnClick={goToTicketDetail}
                    buttonWidth="100%"
                    color="main"
                />
            </Box>

            <Box sx={{ position: "relative", zIndex: 1, display: "flex", justifyContent: "flex-end", p: "0 1.4em 1.2em" }}>
                <Typography sx={(theme: Theme) => ({ color: alpha(theme?.custom?.fontColor, 0.45), fontSize: theme?.typography?.caption.fontSize })}>
                    {isPaused
                        ? t("cart.orderConfirmed.autoClose.paused")
                        : t("cart.orderConfirmed.autoClose.countdown", { seconds: remainingSeconds })}
                </Typography>
            </Box>
        </>
    );
};

export default SaleConfirmedModalActions;
