// OrderConfirmedIconComponent.tsx
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { Box, type Theme } from "@mui/material";
import { useTranslation } from 'react-i18next';
import type { ReactNode } from 'react';
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";


const OrderConfirmedIconComponent = (): ReactNode => {
    const { t } = useTranslation();

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
                <Box
                    component="img"
                    src={getPublicAssetUrl("images/stocko_images/stocko_recipt.png")}
                    alt={t("cart.orderConfirmed.imageAlt")}
                    sx={{
                        width: {
                            xs: '7em',
                            sm: '9em',
                            md: '10em',
                        },
                        height: 'auto',
                    }}
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