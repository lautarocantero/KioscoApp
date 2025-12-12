
// # Componente: ProductDialogIlustration  

// ## Descripción 📦
// Sección ilustrativa dentro del diálogo de producto.  
// Renderiza una imagen representativa del producto junto con su nombre.  

// ## Funciones 🔧
// - `ProductDialogIlustration`: componente principal que recibe como prop `name: string`.  
//   - Renderiza `ProductDialogImage` como imagen del producto.  
//   - Muestra el nombre del producto en un `Typography`.  
// - Usa `Grid` de MUI como contenedor con estilos personalizados.  

// ## Notas técnicas 💽
// - Estilos dinámicos aplicados con `Theme` de MUI para mantener coherencia visual.  
// - Fondo oscuro (`backgroundDark`), bordes redondeados y padding para resaltar la ilustración.  
// - Texto centrado y con tipografía adaptada al tema.  
//-----------------------------------------------------------------------------//

import { Grid, Typography, type Theme } from "@mui/material";
import ProductDialogImage from "./ProductDialogImage";

const ProductDialogIlustration = ({name}: {name: string}):React.ReactNode => {

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
                    // margin: '2em 0 1em',
                })}
            >
                {name}
            </Typography>
        </Grid>
    )
}

export default ProductDialogIlustration;