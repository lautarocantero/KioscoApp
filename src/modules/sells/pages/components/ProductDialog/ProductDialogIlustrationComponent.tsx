
//─────────────────── Componente 🧩: ProductDialogIlustrationComponent ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Renderiza una imagen representativa del producto junto con su nombre.  

//──────────────────── Funciones 🔧 ─────────────────────//
// -ProductDialogIlustrationComponent
//      -ProductDialogImage Renderiza la imagen del producto

//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import ProductDialogImage from "./ProductDialogImageComponent";

const ProductDialogIlustrationComponent = ({name}: {name: string}):React.ReactNode => {

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
            <ProductDialogImage />
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