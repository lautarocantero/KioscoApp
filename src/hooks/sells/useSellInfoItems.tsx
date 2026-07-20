import { useTheme } from "@mui/material";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import type { InfoItem } from "@typings/sells/sellTypes";
import type { SellDetailInfoBarProps } from "@typings/sells/SellComponentTypes";

// 🔧 Hardcodeado temporalmente — luego vendrá del backend (paid_amount < total_amount)
const MOCK_IS_PARTIAL_PAYMENT = true;

export const useSellInfoItems = ({
    purchaseDate,
    purchaseTime,
    timezone,
    sellerName,
    paymentMethodLabel,
    currency,
}: SellDetailInfoBarProps): InfoItem[] => {
    const theme = useTheme();

    return [
        {
            icon: <EventOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.violet,
            label: "Fecha de compra",
            value: `${purchaseDate} • ${purchaseTime}`,
            hint: timezone,
        },
        {
            icon: <PersonOutlineOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.pink,
            label: "Vendedor",
            value: sellerName,
        },
        {
            icon: <PaymentsOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.green,
            label: "Método de pago",
            value: paymentMethodLabel,
            badge: MOCK_IS_PARTIAL_PAYMENT ? "Pago parcial" : undefined,
        },
        {
            icon: <CurrencyExchangeOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.violet,
            label: "Moneda",
            value: currency,
        },
    ];
};