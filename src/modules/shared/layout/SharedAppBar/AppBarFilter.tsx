
// # Componente: AppbarFilter  

// ## Descripción 📦  
// Barra de filtro compacta que se integra en la interfaz como control visual para seleccionar o mostrar criterios de filtrado.  
// Presenta un ícono de despliegue (`ArrowDropDownCircleIcon`) y un texto descriptivo ("Tipo").  

// ## Lógica 🔧  
// - No recibe props, es un componente estático.  
// - Renderiza un `Grid` con estilos dinámicos basados en el `Theme`.  
// - Contiene dos elementos:  
//   - Ícono (`ArrowDropDownCircleIcon`) alineado a la izquierda.  
//   - Texto (`Typography`) alineado a la derecha.  

// ## Renderizado 🎨  
// - `Grid`:  
//   - Fondo oscuro (`backgroundDark`).  
//   - Color de fuente (`fontColor`).  
//   - Bordes redondeados (`borderRadius: '1em'`).  
//   - Layout en fila (`flexDirection: 'row'`) con espacio entre elementos (`justifyContent: 'space-between'`).  
//   - Altura máxima de `3em` y ancho completo.  
// - Ícono: tamaño reducido (`1em`) con margen izquierdo.  
// - Texto: tipografía simple (`1em`) con margen derecho.  

// ## Notas técnicas 💽  
// - Se integra en toolbars o appbars como control de filtrado.  
// - Puede evolucionar para incluir menús desplegables o selectores dinámicos.  
// - Mantiene consistencia visual con el tema global (`theme.custom`).  


import { Grid, Typography, type Theme } from "@mui/material"
import ArrowDropDownCircleIcon from '@mui/icons-material/ArrowDropDownCircle';


export const AppbarFilter = (): React.ReactNode => {
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
                <ArrowDropDownCircleIcon sx={{ fontSize: '1em', ml: '15px' }}/>
                <Typography sx={{ mr: '20px', fontSize: '1em'}}>Tipo</Typography>
        </Grid>
    )
}

