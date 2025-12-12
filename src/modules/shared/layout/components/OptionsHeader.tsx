
// # Componente: OptionsHeader  

// ## Descripción 📦  
// Encabezado reutilizable para secciones de opciones dentro de la aplicación.  
// Renderiza un título acompañado de un ícono, con estilos dinámicos basados en el tema (`appTheme`).  
// Solo se muestra si la prop `isOptions` es verdadera, lo que permite ocultarlo en contextos donde no aplica.  

// ## Lógica 🔧  
// - Props (`OptionsHeaderInterface`):  
//   - `isOptions`: determina si el encabezado debe renderizarse.  
//   - `title`: texto principal del encabezado.  
//   - `icon`: ícono opcional que acompaña al título.  
//   - `appTheme`: booleano que define si se usa tema claro u oscuro.  
// - Renderizado condicional:  
//   - Si `isOptions` es `false`, retorna un fragmento vacío.  
//   - Si `true`, renderiza un `Grid` con estilos y un `Typography` para el título.  

// ## Renderizado 🎨  
// - `Grid`:  
//   - Fondo dinámico (`backgroundDark` o `backgroundLigth`).  
//   - Color de fuente adaptado al tema (`fontColor` o `fontColorDark`).  
//   - Bordes redondeados, márgenes y padding responsivos.  
//   - Texto centrado.  
// - `Typography`:  
//   - Variante `h1` con tamaños de fuente adaptados a breakpoints (`xs`, `sm`, `md`).  
//   - Renderiza ícono (si existe) seguido del título.  

// ## Notas técnicas 💽  
// - Modularidad: puede reutilizarse en cualquier sección de opciones (`DisplayOptions`).  
// - Flexibilidad: soporta ícono opcional y estilos dinámicos según tema.  
// - Accesibilidad visual: tipografía escalable y colores contrastados para mejorar legibilidad.  


import { Grid, Typography, type Theme } from "@mui/material";
import type { OptionsHeaderInterface } from "../../../../typings/ui/uiModules";


const OptionsHeader = ({isOptions,title,icon, appTheme}: OptionsHeaderInterface):React.ReactNode => {

  if(!isOptions) return (<></>);

  return (
      <Grid
        sx={(theme: Theme) => ({
          alignContent: 'center',
          backgroundColor: !appTheme ? theme.custom.backgroundDark : theme.custom.backgroundLigth,
          borderRadius: '1em',
          color: !appTheme ? theme?.custom?.fontColor : theme.custom.fontColorDark,
          width: '90%',
          margin: { xs: "4em 0", sm: '4em 0'},
          padding: {xs: '1em' },
          textAlign: 'center'
        })}
      >
        <Typography
          variant="h1"
          sx={(theme: Theme) => ({
            fontSize: {xs: theme?.typography?.h4.fontSize, sm: theme?.typography?.h2.fontSize, md: theme?.typography?.h1.fontSize },
          })}
        >
          {icon && icon}
          {title}
        </Typography>
      </Grid>
  )
}

export default OptionsHeader;