//─────────────────── Componente 🧩: CartSummaryCard ───────────────────//
//
//─────────────────── Descripción 📝 ───────────────────//
// Card lateral del carrito: título "Resumen de venta", contenido (precio + 
// método de pago pasados como children), botón "Hacer ticket", nota de 
// seguridad y link para volver a productos.
//
//-----------------------------------------------------------------------------//

import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { alpha, Box, Grid, Link, Typography, type Theme } from "@mui/material";
import PrimaryButton from "../../shared/components/Buttons/PrimaryButtonComponent";

type CartSummaryCardProps = {
    children: React.ReactNode;
    onGenerateTicket?: () => void;
    onBack: () => void;
}

const CartSummaryCardComponent = ({ children, onGenerateTicket, onBack }: CartSummaryCardProps): React.ReactNode => {
    return (
        <Grid
            container
            sx={(theme: Theme) => ({
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
                border: `1px solid ${theme?.palette?.primary?.main}`,
                boxShadow: `0 0 0.6em ${alpha(theme?.palette?.primary?.main, 0.25)}`,
                borderRadius: '0.3em',
                padding: '1.5em',
                position: { md: 'sticky' },
                top: { md: '2em' },
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1.2,
                    color: theme?.custom?.white,
                    fontWeight: 700,
                })}
            >
                <Box
                    sx={(theme: Theme) => ({
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: theme?.palette?.primary?.main,
                        color: theme?.custom?.white,
                        borderRadius: '0.5em',
                        width: '1.7em',
                        height: '1.7em',
                    })}
                >
                    <DescriptionOutlinedIcon fontSize="smaller" />
                </Box>
                Resumen de venta
            </Typography>

            {children}

            <PrimaryButton
                buttonText="Hacer ticket"
                buttonOnClick={() => onGenerateTicket?.()}
                buttonWidth={{ xs: '100%' }}
                marginTop="0"
                icon={<ReceiptLongIcon fontSize="small"/>}
            />

            <Box
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 1,
                    backgroundColor: alpha(theme?.palette?.primary?.main, 0.12),
                    borderRadius: '0.8em',
                    padding: '0.8em 1em',
                })}
            >
                <ShieldOutlinedIcon fontSize="small" sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, mt: '0.1em' })} />
                <Typography
                    sx={(theme: Theme) => ({
                        color: theme?.custom?.white,
                        fontSize: theme?.typography?.caption?.fontSize,
                    })}
                >
                    Revisa los productos y confirma el método de pago antes de continuar.
                </Typography>
            </Box>

            <Link
                onClick={onBack}
                underline="hover"
                sx={(theme: Theme) => ({
                    display: 'flex',
                    alignItems: 'center',
                    gap: 0.5,
                    color: theme?.palette?.primary?.main,
                    cursor: 'pointer',
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
            >
                <ArrowBackIcon fontSize="small" /> Volver a productos
            </Link>
        </Grid>
    )
}

export default CartSummaryCardComponent;