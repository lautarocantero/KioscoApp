// OrderConfirmedTitleComponent.tsx
import { Box, Typography, type Theme } from "@mui/material";
import type { ReactNode } from 'react';


const  OrderConfirmedTitleComponent = (): ReactNode => {
    return (
        <Box sx={{ textAlign: 'center', mb: '2em', }}>
            <Typography
                sx={(theme: Theme) => ({
                    color: theme?.custom?.fontColor,
                    fontWeight: 600,
                    fontSize: {
                        xs: theme?.typography?.h4?.fontSize,
                        md: theme?.typography?.h3?.fontSize,
                    },
                })}
            >
                ¡Se ha creado tu{' '}
                <Typography
                    component={'span'}
                    sx={(theme: Theme) => ({
                        color: theme?.palette?.primary?.main,
                        fontWeight: 600,
                        fontSize: 'inherit',
                    })}
                >
                    ticket
                </Typography>
                !
            </Typography>
            <Typography
                sx={(theme: Theme) => ({
                    color: theme?.custom?.darkWhite,
                    fontSize: {
                        xs: theme?.typography?.body2.fontSize,
                        sm: theme?.typography?.body1.fontSize,
                    },
                    mt: '0.3em',
                })}
            >
                Tu venta se ha registrado correctamente.
            </Typography>
        </Box>
    )
}

export default OrderConfirmedTitleComponent;