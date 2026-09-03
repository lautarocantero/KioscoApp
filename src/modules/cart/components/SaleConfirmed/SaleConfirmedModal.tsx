import { Box, Dialog, LinearProgress, type Theme } from "@mui/material";
import type { ReactNode } from "react";
import type { SaleConfirmedModalProps } from "@typings/cart/cartComponentTypes";
import { getSaleConfirmedSummaryFields } from "./getSaleConfirmedSummaryFields";
import SaleConfirmedTicketEdge from "./SaleConfirmedTicketEdge";
import SaleConfirmedModalHeader from "./SaleConfirmedModalHeader";
import SaleConfirmedDivider from "./SaleConfirmedDivider";
import SaleConfirmedBrandStrip from "./SaleConfirmedBrandStrip";
import SaleConfirmedModalSummary from "./SaleConfirmedModalSummary";
import SaleConfirmedModalTotal from "./SaleConfirmedModalTotal";
import SaleConfirmedBarcode from "./SaleConfirmedBarcode";
import SaleConfirmedModalActions from "./SaleConfirmedModalActions";

// Ticket de papel (recibo) flotando sobre el fondo oscuro de la app: bordes
// dentados arriba/abajo, siempre claro sin importar el tema de la app
// (metáfora de recibo impreso), con auto-cierre pausable con el mouse.
const SaleConfirmedModal = ({
    open,
    progress,
    remainingSeconds,
    isPaused,
    ticketSummary,
    onClose,
    onPause,
    onResume,
    onPrintTicket,
    goToTicketDetail,
}: SaleConfirmedModalProps): ReactNode => {
    if (!ticketSummary) return null;

    const { formattedTotal, formattedChange } = getSaleConfirmedSummaryFields(ticketSummary);

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="xs"
            fullWidth
            aria-labelledby="sale-confirmed-modal-title"
            slotProps={{
                paper: {
                    onMouseEnter: onPause,
                    onMouseLeave: onResume,
                    sx: {
                        maxWidth: "372px",
                        m: "auto",
                        backgroundColor: "transparent",
                        boxShadow: "none",
                        overflow: "visible",
                        filter: "drop-shadow(0 26px 50px rgba(0,0,0,0.45))",
                    },
                },
            }}
        >
            <SaleConfirmedTicketEdge />

            <Box sx={(theme: Theme) => ({ backgroundColor: theme.custom?.saleTicket?.paper, pb: "0.25em" })}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={(theme: Theme) => ({
                        height: 3,
                        backgroundColor: theme.custom?.saleTicket?.progressTrack,
                        "& .MuiLinearProgress-bar": {
                            backgroundColor: theme.palette.primary.main,
                            transition: "transform .1s linear",
                        },
                    })}
                />

                <SaleConfirmedModalHeader onClose={onClose} />
                <SaleConfirmedDivider />
                <SaleConfirmedBrandStrip />
                <SaleConfirmedDivider />
                <SaleConfirmedModalSummary ticketSummary={ticketSummary} />
                <SaleConfirmedModalTotal formattedTotal={formattedTotal} formattedChange={formattedChange} />
                <SaleConfirmedBarcode code={ticketSummary.ticketNumber} />
                <SaleConfirmedModalActions
                    onPrintTicket={onPrintTicket}
                    goToTicketDetail={goToTicketDetail}
                    remainingSeconds={remainingSeconds}
                    isPaused={isPaused}
                />
            </Box>

            <SaleConfirmedTicketEdge flipped />
        </Dialog>
    );
};

export default SaleConfirmedModal;
