//─────────────────── Pagina 🧩: OrderConfirmedPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Pagina de confirmacion de compra realizada, muestra resumen del ticket
// (n° de ticket, fecha y total) y da la posibilidad de descargar el ticket
// ante algun error en la descarga automatica.

//──────────────────── Funciones 🔧 ─────────────────────//
// -OrderConfirmedPage pagina que renderiza la vista
//      -fetchTicketSummary Helper (mock) que simula traer el resumen del ticket por endpoint
//      -createPdfTicket Helper que crea un ticket y lo descarga en pdf

//-----------------------------------------------------------------------------//

import { useEffect, useState } from 'react';
import { useParams, Link as LinkReactRouter } from 'react-router-dom';
import ReceiptIcon from '@mui/icons-material/Receipt';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import PrintIcon from '@mui/icons-material/Print';
import AddIcon from '@mui/icons-material/Add';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import EventIcon from '@mui/icons-material/Event';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import DownloadIcon from '@mui/icons-material/Download';
import { Box, Button, Grid, Typography, type Theme } from "@mui/material";
import type { SellTicketType } from '../../../typings/sells/types/sellsTypes';
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import AppLayout from "../../shared/layout/AppLayout";
import { createPdfTicket } from "../helpers/createPdfTicket";

//──────────────────── Types 🧾 ─────────────────────//
type TicketSummaryType = {
    ticketNumber: string;
    date: string;
    total: number;
}

//──────────────────── Mock helper 🔧 ─────────────────────//
// TODO: reemplazar por fetch real a /sells/ticket/:ticketNumber cuando el endpoint este listo
const fetchTicketSummary = (ticketNumber: string): Promise<TicketSummaryType> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                ticketNumber,
                date: new Date().toLocaleString('es-AR', {
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit'
                }),
                total: 8900
            });
        }, 300);
    });
}

const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0
    }).format(value);
}

const OrderConfirmedPage = (): React.ReactNode => {

    const { ticketNumber } = useParams<{ ticketNumber: string }>();
    const [ticketSummary, setTicketSummary] = useState<TicketSummaryType | null>(null);

    useEffect(() => {
        if (!ticketNumber) return;
        fetchTicketSummary(ticketNumber).then(setTicketSummary);
    }, [ticketNumber]);

    const printTicket = (): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if (!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }

    return (
        <AppLayout fullWidth>
            <SimpleGrid>
                <Grid
                    container
                    display={'flex'}
                    flexDirection={'column'}
                    alignItems={'center'}
                    sx={{
                        width: '100%'
                    }}
                >
                    {/*─────────────────── 🔎 Link volver a compras 🔎 ───────────────────*/}
                    <Grid sx={{ width: '100%' }}>
                        <Box
                            component={LinkReactRouter}
                            to={"/new-sell"}
                            sx={(theme: Theme) => ({
                                textDecoration: "none",
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5em",
                                ml: { xs: "1em", sm: "0.5em" },
                                color: theme?.palette?.primary?.main,
                                fontSize: {
                                    xs: theme?.typography?.body2.fontSize,
                                    sm: theme?.typography?.h5.fontSize,
                                },
                                width: "fit-content",
                                "&:hover": {
                                    cursor: "pointer",
                                    color: theme?.custom?.darkSecondary
                                },
                            })}
                        >
                            <ArrowBackIcon sx={(theme: Theme) => ({ fontSize: theme?.typography?.body2 })} />
                            Nueva compra
                        </Box>
                    </Grid>

                    {/*─────────────────── 🔎 Icono con glow y check 🔎 ───────────────────*/}
                    <Grid
                        sx={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            position: 'relative',
                            mt: '3em',
                            mb: '2em'
                        }}
                    >
                        <Box
                            sx={(theme: Theme) => ({
                                position: 'relative',
                                display: 'flex',
                                filter: `drop-shadow(0 0 2.5em ${theme?.palette?.primary?.main}55)`
                            })}
                        >
                            <ReceiptIcon
                                sx={(theme: Theme) => ({
                                    color: theme?.palette?.primary?.main,
                                    fontSize: {
                                        xs: '7em',
                                        sm: '9em',
                                        md: '10em'
                                    },
                                })}
                            />
                            <CheckCircleIcon
                                sx={(theme: Theme) => ({
                                    position: 'absolute',
                                    bottom: '-0.1em',
                                    right: '-0.1em',
                                    color: theme?.palette?.primary?.main,
                                    backgroundColor: theme?.custom?.posBackground,
                                    borderRadius: '50%',
                                    fontSize: {
                                        xs: '2.2em',
                                        sm: '2.6em',
                                        md: '3em'
                                    },
                                })}
                            />
                        </Box>
                    </Grid>

                    {/*─────────────────── 🔎 Titulo y subtitulo 🔎 ───────────────────*/}
                    <Grid sx={{ textAlign: 'center', mb: '2em' }}>
                        <Typography
                            sx={(theme: Theme) => ({
                                color: theme?.custom?.posText,
                                fontWeight: 600,
                                fontSize: {
                                    xs: theme?.typography?.h4?.fontSize,
                                    md: theme?.typography?.h3?.fontSize
                                },
                            })}
                        >
                            ¡Se ha creado tu{' '}
                            <Typography
                                component={'span'}
                                sx={(theme: Theme) => ({
                                    color: theme?.palette?.primary?.main,
                                    fontWeight: 600,
                                    fontSize: 'inherit'
                                })}
                            >
                                ticket
                            </Typography>
                            !
                        </Typography>
                        <Typography
                            sx={(theme: Theme) => ({
                                color: theme?.custom?.posTextSecondary,
                                fontSize: {
                                    xs: theme?.typography?.body2.fontSize,
                                    sm: theme?.typography?.body1.fontSize
                                },
                                mt: '0.3em'
                            })}
                        >
                            Tu venta se ha registrado correctamente.
                        </Typography>
                    </Grid>

                    {/*─────────────────── 🔎 Resumen del ticket 🔎 ───────────────────*/}
                    <Grid
                        sx={(theme: Theme) => ({
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: { xs: '1em', sm: '2em' },
                            backgroundColor: theme?.custom?.posCard,
                            border: `1px solid ${theme?.custom?.posBorder}`,
                            borderRadius: '1em',
                            padding: '1.5em 2em',
                            mb: '2em',
                            width: { xs: '90%', sm: 'auto' },
                            justifyContent: 'center'
                        })}
                    >
                        {/*──── N° de ticket ────*/}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
                            <Box
                                sx={(theme: Theme) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '2.5em',
                                    height: '2.5em',
                                    borderRadius: '50%',
                                    backgroundColor: theme?.custom?.posSurface,
                                })}
                            >
                                <ReceiptLongIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontSize: '1.2em' })} />
                            </Box>
                            <Box>
                                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.posTextSecondary, fontSize: theme?.typography?.caption.fontSize })}>
                                    N° de ticket
                                </Typography>
                                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.posText, fontWeight: 600 })}>
                                    #{ticketSummary?.ticketNumber ?? '------'}
                                </Typography>
                            </Box>
                        </Box>

                        {/*──── Fecha y hora ────*/}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
                            <Box
                                sx={(theme: Theme) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '2.5em',
                                    height: '2.5em',
                                    borderRadius: '50%',
                                    backgroundColor: theme?.custom?.posSurface,
                                })}
                            >
                                <EventIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontSize: '1.2em' })} />
                            </Box>
                            <Box>
                                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.posTextSecondary, fontSize: theme?.typography?.caption.fontSize })}>
                                    Fecha y hora
                                </Typography>
                                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.posText, fontWeight: 600 })}>
                                    {ticketSummary?.date ?? '--/--/---- - --:--'}
                                </Typography>
                            </Box>
                        </Box>

                        {/*──── Total ────*/}
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: '0.7em' }}>
                            <Box
                                sx={(theme: Theme) => ({
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '2.5em',
                                    height: '2.5em',
                                    borderRadius: '50%',
                                    backgroundColor: theme?.custom?.posSurface,
                                })}
                            >
                                <AttachMoneyIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontSize: '1.2em' })} />
                            </Box>
                            <Box>
                                <Typography sx={(theme: Theme) => ({ color: theme?.custom?.posTextSecondary, fontSize: theme?.typography?.caption.fontSize })}>
                                    Total
                                </Typography>
                                <Typography sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontWeight: 700 })}>
                                    {ticketSummary ? formatCurrency(ticketSummary.total) : '$ ----'}
                                </Typography>
                            </Box>
                        </Box>
                    </Grid>

                    {/*─────────────────── 🔎 Botones de accion 🔎 ───────────────────*/}
                    <Grid
                        sx={{
                            display: 'flex',
                            flexDirection: { xs: 'column', sm: 'row' },
                            gap: '1em',
                            width: { xs: '90%', sm: 'auto' },
                            mb: '1.5em'
                        }}
                    >
                        <Button
                            variant="outlined"
                            startIcon={<PrintIcon />}
                            onClick={() => printTicket()}
                            sx={(theme: Theme) => ({
                                color: theme?.palette?.primary?.main,
                                borderColor: theme?.palette?.primary?.main,
                                borderRadius: '0.7em',
                                textTransform: 'none',
                                padding: '0.6em 1.5em',
                                '&:hover': {
                                    borderColor: theme?.custom?.darkSecondary,
                                    backgroundColor: `${theme?.palette?.primary?.main}11`
                                }
                            })}
                        >
                            Imprimir ticket
                        </Button>
                        <Button
                            component={LinkReactRouter}
                            to={"/new-sell"}
                            variant="contained"
                            startIcon={<AddIcon />}
                            sx={(theme: Theme) => ({
                                backgroundColor: theme?.palette?.primary?.main,
                                borderRadius: '0.7em',
                                textTransform: 'none',
                                padding: '0.6em 1.5em',
                                '&:hover': {
                                    backgroundColor: theme?.custom?.darkSecondary,
                                }
                            })}
                        >
                            Nueva compra
                        </Button>
                    </Grid>

                    {/*─────────────────── 🔎 texto de descargar manualmente 🔎 ───────────────────*/}
                    <Grid sx={{ mb: '2em' }}>
                        <Typography
                            sx={(theme: Theme) => ({
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.4em',
                                color: theme?.custom?.posTextSecondary,
                                fontSize: {
                                    xs: theme?.typography?.body2.fontSize,
                                    sm: theme?.typography?.body1.fontSize
                                },
                            })}
                        >
                            <DownloadIcon sx={(theme: Theme) => ({ color: theme?.palette?.primary?.main, fontSize: '1em' })} />
                            Si no se ha descargado, presiona
                            <Typography
                                component={'span'}
                                sx={(theme: Theme) => ({
                                    color: theme.custom.posAccent,
                                    fontSize: 'inherit',
                                    fontWeight: 600,
                                    '&:hover': {
                                        cursor: 'pointer',
                                        color: theme?.custom?.darkSecondary
                                    }
                                })}
                                onClick={() => { printTicket() }}
                            >
                                aquí
                            </Typography>
                        </Typography>
                    </Grid>
                </Grid>
            </SimpleGrid>
        </AppLayout>
    )
}

export default OrderConfirmedPage;