
//─────────────────── Pagina 🧩: OrderConfirmedPage ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Pagina de confirmacion de compra realizada, da la posibilidad de descargar el ticket ante algun error.

//──────────────────── Funciones 🔧 ─────────────────────//
// -OrderConfirmedPage pagina que renderiza la vista
//      -createPdfTicket Helper que crea un ticket y lo descarga en pdf

//-----------------------------------------------------------------------------//

import ReceiptIcon from '@mui/icons-material/Receipt';
import { Grid, Typography, type Theme, Link } from "@mui/material";
import type { SellTicketType } from '../../../typings/sells/types/sellsTypes';
import SimpleGrid from "../../shared/components/SimpleGrid/SimpleGridComponent";
import AppLayout from "../../shared/layout/AppLayout";
import { createPdfTicket } from "../helpers/createPdfTicket";
import { Link as LinkReactRouter } from "react-router-dom";
import ReplyAllIcon from '@mui/icons-material/ReplyAll';

const OrderConfirmedPage = ():React.ReactNode => {

    const printTicket = (): void => {
        const ticketString: string | null = localStorage.getItem('last_ticket');
        if(!ticketString) return;
        const ticket: SellTicketType = JSON.parse(ticketString);
        createPdfTicket(ticket);
    }

    return (
        <AppLayout>
            <SimpleGrid>
                <Grid
                    container
                    display={'flex'}
                    flexDirection={'column'}
                    sx={{
                        width: '100%'
                    }}
                >
                    {/*─────────────────── 🔎 Link volver a compras 🔎 ───────────────────*/}
                    <Grid>
                      <Link
                        component={LinkReactRouter}
                        to={"/new-sell"}
                        sx={(theme: Theme) => ({
                          textDecoration: "none",
                          display: "flex",           
                          alignItems: "center",      
                          gap: "0.5em",                 
                          ml: { xs: "1em", sm: "0.5em" },
                          color: theme?.custom?.fontColorTransparent,
                          fontSize: {
                            xs: theme?.typography?.body2.fontSize,
                            sm: theme?.typography?.h6.fontSize,
                          },
                          borderRadius: "1em",
                          width: "100%",
                          "&:hover": {
                            cursor: "pointer",
                          },
                        })}
                      >
                        <ReplyAllIcon sx={{ fontSize: "1em" }} />
                        Nueva compra
                      </Link>
                    </Grid>

                    {/*─────────────────── 🔎 Ticket y mensaje 🔎 ───────────────────*/}
                    <Grid
                        sx={{
                            width: '100%',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            margin: '3em 0em 1em'
                        }}
                    >
                        <Typography
                            sx={(theme: Theme) => ({
                                color: theme?.palette?.primary?.main,
                                fontSize: { 
                                    xs: theme?.typography?.h4?.fontSize, 
                                    md: theme?.typography?.h2?.fontSize
                                },
                            })}
                        >
                            ¡se ha creado tu ticket!
                        </Typography>
                        <ReceiptIcon 
                            sx={(theme: Theme) => ({
                                color: theme?.palette?.primary?.main,
                                fontSize: { 
                                    xs: '10em', 
                                    sm: '15em',
                                    md: '20em'
                                },
                            })}
                        />
                    </Grid>
                        {/*─────────────────── 🔎 texto de descargar manualmente 🔎 ───────────────────*/}
                        <Grid>
                            <Typography
                                sx={(theme: Theme) => ({
                                    textAlign: 'end',
                                    color: theme?.custom?.fontColor,
                                    mr: { xs: '1em', sm: '0.5em'},
                                    fontSize: {
                                        xs: theme?.typography?.body2.fontSize,
                                        sm: theme?.typography?.h6.fontSize
                                    },
                                })}
                            >
                                si no se ha descargado, presiona 
                                <Typography
                                    component={'span'}
                                    sx={(theme: Theme) => ({
                                        color: theme.palette.primary.main,
                                        fontSize: {
                                            xs: theme?.typography?.body2.fontSize,
                                            sm: theme?.typography?.h6.fontSize
                                        },
                                        ml: '0.3em',
                                        '&:hover': {
                                        cursor: 'pointer',
                                        }
                                    })}
                                    onClick={() => {printTicket()}}
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