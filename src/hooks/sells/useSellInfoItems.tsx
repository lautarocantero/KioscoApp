import { useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import EventOutlinedIcon from "@mui/icons-material/EventOutlined";
import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
import PaymentsOutlinedIcon from "@mui/icons-material/PaymentsOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import type { InfoItem } from "@typings/sells/sellTypes";
import type { SellDetailInfoBarProps } from "@typings/sells/SellComponentTypes";


export const useSellInfoItems = ({
    purchaseDate,
    purchaseTime,
    timezone,
    sellerName,
    paymentMethodLabel,
    currency,
    isPartialPayment,
}: SellDetailInfoBarProps): InfoItem[] => {
    const theme = useTheme();
    const { t } = useTranslation();

    return [
        {
            icon: <EventOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.violet,
            label: t("sells.detail.info.purchaseDate"),
            value: `${purchaseDate} • ${purchaseTime}`,
            hint: timezone,
        },
        {
            icon: <PersonOutlineOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.pink,
            label: t("sells.detail.info.seller"),
            value: sellerName,
        },
        {
            icon: <PaymentsOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.green,
            label: t("sells.detail.info.paymentMethod"),
            value: paymentMethodLabel,
            badge: isPartialPayment ? t("sells.detail.info.partialPaymentBadge") : undefined,
        },
        {
            icon: <CurrencyExchangeOutlinedIcon fontSize="small" aria-hidden="true" />,
            color: theme.custom.accents.violet,
            label: t("sells.detail.info.currency"),
            value: currency,
        },
    ];
};