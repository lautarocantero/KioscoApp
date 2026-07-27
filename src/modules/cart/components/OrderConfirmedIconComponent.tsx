// OrderConfirmedIconComponent.tsx
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, type Theme } from "@mui/material";
import type { ReactNode } from 'react';


const OrderConfirmedIconComponent = (): ReactNode => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                mt: '3em',
                mb: '2em',
            }}
        >
            <Box
                sx={(theme: Theme) => ({
                    position: 'relative',
                    display: 'flex',
                    filter: `drop-shadow(0 0 2.5em ${theme?.palette?.primary?.main}55)`,
                })}
            >
                <ReceiptIcon
                    sx={(theme: Theme) => ({
                        color: theme?.palette?.primary?.main,
                        fontSize: {
                            xs: '7em',
                            sm: '9em',
                            md: '10em',
                        },
                    })}
                />
                <CheckCircleIcon
                    sx={(theme: Theme) => ({
                        position: 'absolute',
                        bottom: '-0.1em',
                        right: '-0.1em',
                        color: theme?.palette?.secondary?.main,
                        backgroundColor: theme?.custom?.darkBackground,
                        borderRadius: '50%',
                        fontSize: {
                            xs: '2.2em',
                            sm: '2.6em',
                            md: '3em',
                        },
                    })}
                />
            </Box>
        </Box>
    )
}

export default OrderConfirmedIconComponent;