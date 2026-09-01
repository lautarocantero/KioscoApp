import { Dialog, LinearProgress, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { ReactNode } from "react";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import type { SaleConfirmedModalProps } from "@typings/cart/cartComponentTypes";
import SaleConfirmedModalHeader from "./SaleConfirmedModalHeader";
import SaleConfirmedModalSummary from "./SaleConfirmedModalSummary";
import SaleConfirmedModalActions from "./SaleConfirmedModalActions";

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
                    sx: (theme: Theme) => ({
                        borderRadius: "16px",
                        border: "0.5px solid",
                        borderColor: alpha(theme?.custom?.white, 0.08),
                        ...getNoisyBackgroundSx({ theme }),
                        overflow: "hidden",
                    }),
                },
            }}
        >
            <LinearProgress
                variant="determinate"
                value={progress}
                sx={(theme: Theme) => ({
                    height: 3,
                    backgroundColor: alpha(theme?.custom?.white, 0.06),
                    "& .MuiLinearProgress-bar": {
                        backgroundColor: theme?.palette?.primary?.main,
                        transition: "transform .1s linear",
                    },
                })}
            />

            <SaleConfirmedModalHeader onClose={onClose} />
            <SaleConfirmedModalSummary ticketSummary={ticketSummary} />
            <SaleConfirmedModalActions
                onPrintTicket={onPrintTicket}
                goToTicketDetail={goToTicketDetail}
                remainingSeconds={remainingSeconds}
                isPaused={isPaused}
            />
        </Dialog>
    );
};

export default SaleConfirmedModal;
