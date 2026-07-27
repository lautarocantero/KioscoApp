import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alpha, Box, Link, Typography, type Theme } from "@mui/material";
import PrimaryButton from "../../shared/components/Buttons/PrimaryButtonComponent";
import type { ReactNode } from 'react';
import type { CartSummaryFooterProps } from '@typings/seller/sellerComponentTypes';


const CartSummaryFooterComponent = ({ total, onBack, onGenerateTicket }: CartSummaryFooterProps): ReactNode => {

    if (total <= 0) return null;

    return (
        <Box
            sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: { xs: 'center', sm: 'flex-end', md: 'center', lg: 'flex-end' },
                gap: 2,
                width: '100%',
            }}
        >
            <Box
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    backgroundColor: alpha(theme?.palette?.primary?.main, 0.12),
                    borderRadius: '0.8em',
                    padding: '0.8em 1em',
                    margin: "auto",
                    width: { xs: '100%', lg: "15em" },
                })}
            >
                <ShieldOutlinedIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, mt: '0.1em' })} />
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.fontColor,
                        fontSize: theme?.typography?.caption?.fontSize,
                    })}
                >
                    Revisa los productos y confirma el método de pago antes de continuar.
                </Typography>
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column-reverse', sm: 'row', md: 'column-reverse', lg: 'row' },
                    alignItems: 'center',
                    justifyContent: { xs: 'center', sm: 'space-between', md: 'center', lg: 'space-between' },
                    gap: 2,
                    width: { xs: '100%' },
                }}
            >
                <Link
                    onClick={onBack}
                    underline="hover"
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        gap: 0.5,
                        color: theme?.custom?.translucidFontColor,
                        cursor: 'pointer',
                        fontSize: theme?.typography?.body2?.fontSize,
                        whiteSpace: 'nowrap',
                    })}
                >
                    <ArrowBackIcon fontSize="small" /> Volver a productos
                </Link>

                <PrimaryButton
                    buttonText="Hacer ticket"
                    buttonOnClick={() => onGenerateTicket?.()}
                    buttonWidth={{ xs: '100%', sm: '15em', md: "100%", lg: '15em' }}
                    marginTop="0"
                    icon={<ReceiptLongIcon fontSize="small" />}
                />
            </Box>
        </Box>
    )
}

export default CartSummaryFooterComponent;