import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import { PAYMENT_METHOD_LABELS } from '@typings/sells/SellMethodLabels';
import type { TicketSummaryType } from '@typings/sells/sellTypes';
import type { SummaryItem } from '@typings/seller/sellerComponentTypes';
import { formatCurrency } from '../../helpers/formatCurrency';


export const getTicketSummaryItems = (ticketSummary: TicketSummaryType): SummaryItem[] => [
    {
        id: 'products',
        icon: Inventory2OutlinedIcon,
        iconColor: (theme) => theme?.palette?.primary?.main,
        label: 'Productos',
        value: `${ticketSummary.productsCount}`,
    },
    {
        id: 'total',
        icon: PaidOutlinedIcon,
        iconColor: (theme) => theme?.palette?.primary?.main,
        label: 'Total',
        value: formatCurrency(ticketSummary.total),
    },
    {
        id: 'payment-method',
        icon: AccountBalanceWalletOutlinedIcon,
        iconColor: (theme) => theme?.palette?.primary?.main,
        label: 'Pago',
        value: PAYMENT_METHOD_LABELS[ticketSummary.paymentMethod],
    },
    {
        id: 'date',
        icon: EventOutlinedIcon,
        iconColor: (theme) => theme?.palette?.primary?.main,
        label: 'Fecha',
        value: ticketSummary.date,
    },
];