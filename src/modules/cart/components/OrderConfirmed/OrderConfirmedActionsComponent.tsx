import PrintIcon from '@mui/icons-material/Print';
import { Box } from "@mui/material";
import type { ReactNode } from 'react';
import PrimaryButtonComponent from "../../../shared/components/Buttons/PrimaryButtonComponent";
import EmptyButton from "../../../shared/components/Buttons/EmptyButton";
import type { OrderConfirmedActionsProps } from '@typings/cart/cartComponentTypes';


const OrderConfirmedActionsComponent = ({ onPrintTicket, onNewSell, goToTicketDetail }: OrderConfirmedActionsProps): ReactNode => {
    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '1em',
                width: { xs: '90%', sm: '80%', md: "20em" },
                mb: '1em',
            }}
        >
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', sm: 'row' },
                    gap: '1em',
                    width: '100%',
                }}
            >
                <PrimaryButtonComponent
                    buttonText="Imprimir ticket"
                    buttonOnClick={onPrintTicket}
                    buttonWidth="100%"
                    marginTop="0"
                    icon={<PrintIcon fontSize="small" sx={{ mr: 1 }} />}
                />
                <EmptyButton
                    buttonText="+ Nueva compra"
                    buttonOnClick={onNewSell}
                    buttonWidth="100%"
                    color='main'
                />
            </Box>

            <EmptyButton
                buttonText="Ver detalle de ticket"
                buttonOnClick={goToTicketDetail}
                buttonWidth="100%"
            />
        </Box>
    )
}

export default OrderConfirmedActionsComponent;