import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import PaidOutlinedIcon from '@mui/icons-material/PaidOutlined';
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import type { TicketSummaryType } from '@typings/sells/sellTypes';
import type { SummaryItem } from '@typings/cart/cartComponentTypes';
import { formatCurrency } from '../../helpers/formatCurrency';
import i18n from '@i18n/i18n';


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
        value: i18n.t(`paymentMethod.${ticketSummary.paymentMethod}`),
    },
    {
        id: 'date',
        icon: EventOutlinedIcon,
        iconColor: (theme) => theme?.palette?.primary?.main,
        label: 'Fecha',
        value: ticketSummary.date,
    },
];