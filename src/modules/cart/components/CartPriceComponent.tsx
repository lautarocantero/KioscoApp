//─────────────────── Componente 🧩: ProductsList ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Este componente se encarga de mostrar la informacion del precio del carrito
// tiene en cuenta la suma de los productos y el iva
//──────────────────── Funciones 🔧 ─────────────────────//
// CartPrice Componente principal que se encarga de renderizar boxes que muestran la informacion

//─────────────────── 📝 To do: Cambiar colores por colores del theme ───────────────────//
//─────────────────── 📝 To do: Cambiar datos fijos por datos reales ───────────────────//
//─────────────────── 📝 To do: agregar iva en una constante ───────────────────//
//─────────────────── 📝 To do: componetizar las capsulas ───────────────────//

//-----------------------------------------------------------------------------//

import { Box, Grid, Typography, type Theme } from "@mui/material";
import type { CartPriceComponentType } from "../../../typings/sells/sellsTypes";
import { formatCurrency } from "../helpers/formatCurrency";

const CartPriceComponent = (
    {productsTotalPrice,ivaPercentage,ivaAmount,total}
    : CartPriceComponentType): React.ReactNode => {

    return (
        <Grid 
            container 
            display="flex" 
            flexDirection="column" 
            gap={1}
        >
            <Grid>
                <Typography display="flex" justifyContent="flex-end" gap={1}>
                  <Box
                  sx={(theme: Theme) => ({
                      padding: "0.3em 0.6em",
                      borderRadius: "1em",
                      color: "white",
                      fontWeight: 500,
                      fontSize: theme?.typography?.body2.fontSize
                  })}
                  >
                  Productos:
                  </Box>
                  <Box
                  sx={(theme: Theme) => ({
                      backgroundColor: theme?.custom?.whiteTranslucid,
                      padding: "0.3em 0.6em",
                      borderRadius: "1em",
                      color: theme?.custom?.white,
                      fontWeight: 600,
                      fontSize: theme?.typography?.body2.fontSize
                  })}
                  >
                    {formatCurrency(productsTotalPrice)}
                  </Box>
                </Typography>
            </Grid>

            <Grid>
                <Typography display="flex" justifyContent="flex-end" gap={1}>
                    <Box
                    sx={(theme: Theme) => ({
                        alignItems: 'center',
                        backgroundColor: "#6b100a6c",
                        padding: "0.3em 0.6em",
                        borderRadius: "1em",
                        color: theme?.palette?.error?.main,
                        display: 'flex',
                        fontWeight: 600,
                        fontSize: theme?.typography?.body2.fontSize
                        })}
                    >
                    IVA + {ivaPercentage}%
                    <Box
                        sx={(theme: Theme) => ({
                            backgroundColor: "#310704ff",
                            padding: "0.3em 0.6em",
                            borderRadius: "1em",
                            color: theme?.palette?.error?.main,
                            fontWeight: 600,
                            marginLeft: '1em'
                        })}
                    >
                        {formatCurrency(ivaAmount)}
                    </Box>
                    </Box>
                </Typography>
            </Grid>

            <Grid>
                <Typography display="flex" justifyContent="flex-end" gap={1}>
                    <Box
                        sx={(theme: Theme) => ({
                            alignItems: 'center',
                            backgroundColor: theme?.palette?.primary?.main,
                            padding: "0.3em 0.6em",
                            borderRadius: "1em",
                            color: theme?.custom?.white,
                            display: 'flex',
                            fontWeight: 600,
                            fontSize: theme?.typography?.body2.fontSize
                        })}
                    >
                        Total de venta 
                        <Box
                            sx={(theme: Theme) => ({
                                backgroundColor: theme?.palette?.primary?.dark,
                                padding: "0.3em 0.6em",
                                borderRadius: "1em",
                                color: theme?.custom?.white,
                                fontWeight: 600,
                                marginLeft: '1em'
                            })}
                        >
                            {formatCurrency(total)}
                        </Box>
                    </Box>
                </Typography>
            </Grid>
        </Grid>
    )

}

export default CartPriceComponent;