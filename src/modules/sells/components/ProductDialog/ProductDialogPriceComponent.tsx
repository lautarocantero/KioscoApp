
//─────────────────── Componente 🧩: ProductDialogPriceComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Muestra el precio del producto y variaciones en el diálogo.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Renderiza precio base del producto.  
//   - Muestra descuentos o promociones si existen.  
//   - Actualiza precio dinámicamente según variante seleccionada.  

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { DialogDataPriceProps } from "@typings/sells/reactComponents";
import React, { useMemo } from "react";

const ProductDialogPriceComponent = ({values}: DialogDataPriceProps): React.ReactNode => {

    const formatter = useMemo( () => 
      new Intl.NumberFormat("es-AR", 
        { 
          style: "currency", 
          currency: "ARS", 
          minimumFractionDigits: 2, 
        }),
      [] 
    );

    if(!values?.Presentation) return null;

    if(values?.PresentationId === "") return null;

    if(values?.requiredStock === 0) return null;

    const totalPrice: number = (values?.Presentation?.price ?? 0) * values?.requiredStock;

    return (
        <Grid
            container
            display={'flex'}
            flexDirection={'row'}
            sx={({
                ml: { xs: '0.1em'}
            })}
        >
            <Typography
                sx={(theme: Theme) => ({
                  color: totalPrice === 0 ? theme?.custom?.fontColorTransparent : theme?.custom?.fontColor,
                })}
            >
              {/* ─────────────────── 🔎 el formato numerico es para el dinero, comas decimales 🔎 ─────────────────── */}
              Total: {formatter.format(totalPrice)}
            </Typography>
        </Grid>
    )
}

export default React.memo(ProductDialogPriceComponent);
