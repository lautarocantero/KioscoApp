
// # Componente: BackButton  

// ## Descripción 📦  
// Botón reutilizable que permite al usuario volver a la pantalla anterior en la navegación.  
// Se integra con `react-router-dom` para manejar la acción de retroceso en el historial de rutas.  

// ## Lógica 🔧  
// - Usa `useNavigate` para obtener la función de navegación.  
// - Al hacer clic en el botón, ejecuta `navigate(-1)` para retroceder una página en el historial.  
// - Recibe la prop `appTheme` desde `BackButtonProps` para determinar el color del texto:  
//   - Si `appTheme` es `true` → color `blackTranslucid`.  
//   - Si `appTheme` es `false` → color `whiteTranslucid`.  

// ## Renderizado 🎨  
// - Contenedor `Grid`:  
//   - Bordes redondeados (`borderRadius: "1em"`).  
//   - Altura fija (`3.5em`).  
//   - Ocupa todo el ancho disponible (`width: "100%"`).  
//   - Centrado vertical y horizontal.  
// - `Button`:  
//   - Texto "Volver".  
//   - Ícono `KeyboardReturnIcon` alineado a la izquierda con margen derecho.  
//   - Tipografía adaptada al tema (`body2`).  

// ## Notas técnicas 💽  
// - Componente altamente reutilizable en cualquier vista que requiera navegación hacia atrás.  
// - Mantiene consistencia visual al usar estilos dinámicos basados en `Theme`.  
// - Se integra en flujos de usuario donde se necesita retroceder sin depender de enlaces estáticos.  


import { useNavigate } from "react-router-dom";
import { Button, Grid, type Theme } from "@mui/material";
import KeyboardReturnIcon from '@mui/icons-material/KeyboardReturn';
import type { BackButtonProps } from "../../../../typings/ui/uiModules";


const BackButton = ({appTheme}: BackButtonProps): React.ReactNode => {
    const navigate = useNavigate();
    return (
        <Grid
            sx={() => ({
                borderRadius: "1em",
                width: "100%",
                height: '3.5em',
                textAlign: 'center',
                alignContent: 'center',
            })}>
            <Button 
                onClick={()=> navigate(-1)}
                sx={(theme: Theme) => ({
                    color: appTheme ? theme?.custom?.blackTranslucid : theme?.custom?.whiteTranslucid,
                    fontSize: theme?.typography?.body2?.fontSize,
                })}
            >
                <KeyboardReturnIcon sx={(theme) => ({ 
                    fontSize: theme?.typography?.body2?.fontSize,
                    marginRight: '10px'
                })}/>
                Volver
            </Button>
        </Grid>
    )
}

export default BackButton;