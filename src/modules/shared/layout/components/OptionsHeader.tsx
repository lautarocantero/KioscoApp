
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


import { Box, Typography, type Theme } from "@mui/material";
import type { OptionsHeaderInterface } from "../../../../typings/ui/uiModules";
import { useLocation } from "react-router-dom";

const OptionsHeader = ({ isOptions, title, icon, appTheme }: OptionsHeaderInterface): React.ReactNode => {

  const { pathname } = useLocation(); 
  const isHome = pathname === "/home";
  
  if (!isOptions) return <></>;

  return (
    <Box
      sx={(theme: Theme) => ({
        width: "100%",
        borderBottom: `0.5px solid ${
          !appTheme ? "rgba(255,255,255,0.1)" : theme.custom?.blackTranslucid
        }`,
      })}
    >
      {isHome && (
        <Typography
          variant="body2"
          sx={(theme: Theme) => ({
            color: theme.custom?.fontColor,
            mb: 0.5,
            display: "block",
            fontWeight: 400,
          })}
        >
          ¡Hola! 👋
        </Typography>
      )}
      <Typography
        variant="h2"
        sx={(theme: Theme) => ({
          fontSize: {
            xs: theme.typography?.h5.fontSize,
            sm: theme.typography?.h4.fontSize,
            md: theme.typography?.h2.fontSize,
          },
          fontWeight: 500,
          color: !appTheme ? theme.custom?.fontColor : theme.custom?.fontColorDark,
        })}
      >
        {icon && (
          <Box component="span" sx={(theme) => ({ mr: 1, verticalAlign: "middle", color: theme?.palette?.primary?.main  })}>
            {icon}
          </Box>
        )}
        {title}
      </Typography>
      <Typography
        variant="caption"
        sx={(theme: Theme) => ({
          color: !appTheme
            ? theme.custom?.fontColorTransparent
            : theme.custom?.fontColorDarkTransparent,
          mt: 0.5,
          display: "block",
        })}
      >
        Seleccioná una opción para continuar
      </Typography>
    </Box>
  );
};

export default OptionsHeader;