import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';


const TicketSavedNoticeComponent = (): ReactNode => {
    const { t } = useTranslation();

    return (
        <Box
            sx={(theme: Theme) => ({
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.8em',
                backgroundColor: `${theme?.custom?.darkBackground}1A`,
                border: `1px solid ${theme?.custom?.darkGray}55`,
                borderRadius: '0.8em',
                padding: '0.9em 1.2em',
                width: { xs: '90%', sm: '90%', md: "40em" },
                mb: '1.5em',
            })}
        >
            <CheckCircleOutlineIcon sx={(theme: Theme) => ({ color: theme?.custom?.accents?.green })} />
            <Box>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.fontColor, fontWeight: 600, fontSize: theme?.typography?.body2.fontSize })}>
                    {t("cart.orderConfirmed.savedNotice.title")}
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.darkWhite, fontSize: theme?.typography?.caption.fontSize })}>
                    {t("cart.orderConfirmed.savedNotice.subtitle")}
                </Typography>
            </Box>
        </Box>
    )
}

export default TicketSavedNoticeComponent;