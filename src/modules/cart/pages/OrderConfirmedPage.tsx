import { Grid } from "@mui/material";
import AppLayout from "../../shared/layout/AppLayout";
import { useContext, type ReactNode } from 'react';
import { useCart } from '../../../hooks/sellers/useCart';
import { SnackBarContext } from '../../shared/components/SnackBar/SnackBarContext';
import OrderConfirmedIconComponent from "../components/OrderConfirmedIconComponent";
import OrderConfirmedTitleComponent from "../components/OrderConfirmedTitleComponent";
import TicketSummaryDetailsComponent from "../components/TicketSummaryDetailsComponent";
import TicketSavedNoticeComponent from "../components/TicketSavedNoticeComponent";
import OrderConfirmedActionsComponent from "../components/OrderConfirmedActionsComponent";
import NoisyCard from "../../shared/components/Cards/NoisyCard";


const OrderConfirmedPage = (): ReactNode => {

    const { showSnackBar } = useContext(SnackBarContext)!;
    const { ticketSummary, printTicket, goToNewSell, goToTicketDetail } = useCart(showSnackBar);

    return (
        <AppLayout fullWidth>
            <NoisyCard 
                sx={{ 
                    width: { xs: '100%', md: '90%', lg: '50em' }, 
                    margin: '2em auto',
                }}
            >
                <Grid
                    container
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    sx={{ width: '100%' }}
                >
                    <OrderConfirmedIconComponent />
                    <OrderConfirmedTitleComponent />
                    <TicketSummaryDetailsComponent ticketSummary={ticketSummary} />
                    <TicketSavedNoticeComponent />
                    <OrderConfirmedActionsComponent onPrintTicket={printTicket} onNewSell={goToNewSell} goToTicketDetail={goToTicketDetail}/>
                </Grid>
            </NoisyCard>
        </AppLayout>
    )
}

export default OrderConfirmedPage;