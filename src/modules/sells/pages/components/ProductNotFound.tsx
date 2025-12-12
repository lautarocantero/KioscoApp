
// # Componente: ProductsNotFound  

// ## Descripción 📦
// Renderiza un mensaje informativo cuando no se encuentran productos en la lista.  
// Sirve como feedback visual para el usuario en escenarios de búsqueda vacía o sin resultados.  

// ## Funciones 🔧
// - `ProductsNotFound`: componente principal sin props.  
//   - Renderiza un `Grid` con margen superior e inferior.  
//   - Dentro, muestra un `Typography` con el texto:  
//     **"No se encontraron Productos..."**.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI como contenedor para centrar y espaciar el mensaje.  
// - Se integra en vistas de productos como fallback cuando el array de productos está vacío.  
// - Mantiene la consistencia visual con el resto de componentes al usar tipografía de MUI.  
//-----------------------------------------------------------------------------//

import { Grid, Typography } from "@mui/material";

const ProductsNotFound = ():React.ReactNode => {
    return (
        <Grid 
            margin={'5em auto'}
        >
            <Typography>No se encontraron Productos...</Typography>
        </Grid>
    )
}

export default ProductsNotFound;