
// # Componente: AppbarSearch  

// ## Descripción 📦  
// Barra de búsqueda compacta que se integra en la interfaz como control visual para mostrar o iniciar búsquedas.  
// Presenta un texto de ejemplo ("Coca cola...") y un ícono de búsqueda (`SearchIcon`).  

// ## Lógica 🔧  
// - No recibe props, es un componente estático.  
// - Renderiza un `Grid` con estilos dinámicos basados en el `Theme`.  
// - Contiene dos elementos:  
//   - Texto (`Typography`) alineado a la izquierda, que actúa como placeholder o ejemplo de búsqueda.  
//   - Ícono (`SearchIcon`) alineado a la derecha, representando la acción de búsqueda.  

// ## Renderizado 🎨  
// - `Grid`:  
//   - Fondo oscuro (`backgroundDark`).  
//   - Color de fuente (`fontColor`).  
//   - Bordes redondeados (`borderRadius: '1em'`).  
//   - Layout en fila (`flexDirection: 'row'`) con espacio entre elementos (`justifyContent: 'space-between'`).  
//   - Altura máxima de `3em` y ancho completo.  
// - `Typography`: texto fijo con margen izquierdo.  
// - `SearchIcon`: ícono pequeño (`1em`) con margen derecho.  

// ## Notas técnicas 💽  
// - Se integra en `AppBar` o toolbars como control visual de búsqueda.  
// - Puede evolucionar para aceptar entradas dinámicas o integrar un campo de texto real.  
// - Mantiene consistencia visual con el tema global (`theme.custom`).  


import { Grid, Typography, type Theme } from "@mui/material"
import SearchIcon from '@mui/icons-material/Search';

export const AppbarSearch = (): React.ReactNode => {
    return (
        <Grid
            sx={(theme: Theme) => ({
                alignItems: 'center',
                backgroundColor: theme?.custom?.backgroundDark,
                borderRadius: '1em',
                color: theme?.custom?.fontColor,
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'space-between',
                maxHeight: '3em',
                width: '100%',
            })}>
                <Typography sx={{ ml: '20px'}}>Coca cola...</Typography>
                <SearchIcon sx={{ fontSize: '1em', mr: '20px'}}/>
        </Grid>
    )
}