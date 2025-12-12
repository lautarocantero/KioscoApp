
// # Componente: ApiErrorsHandler  

// ## Descripción 📦  
// Componente reutilizable para mostrar mensajes de error provenientes de la API o validaciones de formulario.  
// Renderiza un texto estilizado en color de error dentro de un contenedor `Grid`.  
// Si no existe un error, no muestra nada (retorna un fragmento vacío).  

// ## Notas técnicas 💽  
// - Prop `error` tipada con `FormErrorsHandlerInterface`.  
// - Usa `Typography` de MUI para mostrar el mensaje con estilo consistente:  
//   - Color: `theme.palette.error.main`.  
//   - Tamaño de fuente: `theme.typography.caption.fontSize`.  
//   - Margen superior para separación visual.  
// - Se integra en formularios o vistas que requieran feedback de errores de manera clara y accesible.  


import { Grid, Typography, type Theme } from "@mui/material";
import type { FormErrorsHandlerInterface } from "../../../../typings/ui/uiErrors";


const ApiErrorsHandler = ({error} : FormErrorsHandlerInterface ): React.ReactNode => {

    if(!error) return (<></>);

    return (
        <Grid
            container
            sx={{
                width: "100%"
            }}
        >
            <Typography
                sx={(theme: Theme) => ({ 
                    color: theme?.palette.error.main,
                    fontSize: theme?.typography?.caption?.fontSize,
                    marginTop: '1em'
                })}
            >
                {error}
            </Typography>
        </Grid>
    )

}

export default ApiErrorsHandler;