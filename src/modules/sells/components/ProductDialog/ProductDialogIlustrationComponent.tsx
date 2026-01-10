
//─────────────────── Componente 🧩: ProductDialogIlustrationComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza una imagen representativa del producto junto con su nombre.  

//──────────────────── Funciones 🔧 ─────────────────────//
// -ProductDialogIlustrationComponent
//      -ProductDialogImage Renderiza la imagen del producto

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import type { ProductDialogIlustrationProps } from "@typings/sells/reactComponents";
import ProductDialogImage from "./ProductDialogImageComponent";

const ProductDialogIlustrationComponent = (
    {name = 'Product', image_url = '/images/productExample/cocaCola.png'}: ProductDialogIlustrationProps ):React.ReactNode => {

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

export default ProductDialogIlustrationComponent;