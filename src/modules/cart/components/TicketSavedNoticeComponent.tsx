import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { Box, Typography, type Theme } from "@mui/material";
import type { ReactNode } from 'react';


const TicketSavedNoticeComponent = (): ReactNode => {
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
                    Ticket guardado automáticamente
                </Typography>
                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.darkWhite, fontSize: theme?.typography?.caption.fontSize })}>
                    Puedes imprimirlo o iniciar una nueva venta.
                </Typography>
            </Box>
        </Box>
    )
}

export default TicketSavedNoticeComponent;