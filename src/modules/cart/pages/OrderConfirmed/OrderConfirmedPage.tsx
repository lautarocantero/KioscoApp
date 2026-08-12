import { Grid } from "@mui/material";
import AppLayout from "../../../shared/layout/AppLayout";
import { useContext, type ReactNode } from 'react';
import { useCart } from '../../../../hooks/cart/useCart';
import { SnackBarContext } from '../../../shared/components/SnackBar/SnackBarContext';
import OrderConfirmedIconComponent from "../../components/OrderConfirmed/OrderConfirmedIconComponent";
import OrderConfirmedTitleComponent from "../../components/OrderConfirmed/OrderConfirmedTitleComponent";
import OrderConfirmedActionsComponent from "../../components/OrderConfirmed/OrderConfirmedActionsComponent";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import TicketSummaryDetailsComponent from "../../components/OrderConfirmed/TicketSummaryDetailsComponent";
import TicketSavedNoticeComponent from "../../components/OrderConfirmed/TicketSavedNoticeComponent";


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