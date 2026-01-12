
//─────────────────── Componente 🧩: ProductDialogIllustrationComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza ilustraciones o gráficos asociados al producto.  

//──────────────────── Funciones 🔧 ─────────────────────//
//   - Muestra ilustración principal del producto.  

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { ProductDialogIlustrationProps } from "@typings/sells/reactComponents";
import React from "react";
import ProductDialogImage from "./ProductDialogImageComponent";

const ProductDialogIlustrationComponent = (
    {
        image_url = '/images/productExample/cocaCola.png',
        name = 'Product', 
    }: ProductDialogIlustrationProps ) : React.ReactNode => {

    return (
        <Grid
          container
          sx={(theme: Theme) => ({
            backgroundColor: theme?.custom?.backgroundDark,
            borderRadius: '1em',
            padding: 1,
            justifyContent: 'center'
          })}
        >
            <ProductDialogImage image_url={image_url} name={name}/>
            <Typography
                sx={(theme: Theme) => ({
                    fontSize: theme?.typography?.body1?.fontSize,
                })}
            >
                {name}
            </Typography>
        </Grid>
    )
}

export default React.memo(ProductDialogIlustrationComponent);