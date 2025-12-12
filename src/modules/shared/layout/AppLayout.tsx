
// # Componente: AppLayout  

// ## Descripción 📦  
// Layout principal que envuelve las páginas de la aplicación, proporcionando estructura, estilos globales y barra superior compartida.  
// Se adapta dinámicamente al tema (`appTheme`) y permite renderizar encabezados de opciones (`OptionsHeader`) cuando corresponde.  

// ## Lógica 🔧  
// - Props (`AppLayoutProps`):  
//   - `children`: contenido principal de la página.  
//   - `isOptions`: determina si se renderiza el encabezado de opciones y si se ocultan los filtros en la `SharedAppBar`.  
//   - `title`: título de la sección (usado en `OptionsHeader`).  
//   - `icon`: ícono opcional que acompaña al título.  
// - Contexto:  
//   - Usa `ThemeContext` para obtener `appTheme` y aplicar colores dinámicos.  
// - Renderizado condicional:  
//   - Si no hay `children`, muestra un mensaje `"No children Loaded..."`.  
//   - Si existen, renderiza el layout completo con `Box` y `Grid`.  

// ## Renderizado 🎨  
// - `Box`:  
//   - Ocupa toda la pantalla (`100vh`, `100vw`).  
//   - Fondo dinámico según tema (`backgroundDark` o `white`).  
// - `Grid` contenedor:  
//   - Estructura en filas y columnas, con flexbox para distribución.  
// - `SharedAppBar`:  
//   - Barra superior compartida, muestra filtros solo si `isOptions` es `false`.  
// - `OptionsHeader`:  
//   - Encabezado opcional con título e ícono, estilizado según tema.  
// - `children`:  
//   - Contenido principal de la página, renderizado dentro del `Grid` principal.  

// ## Notas técnicas 💽  
// - Modularidad: separa responsabilidades entre `SharedAppBar`, `OptionsHeader` y el contenido (`children`).  
// - Flexibilidad: puede usarse tanto en páginas con opciones (`isOptions=true`) como en páginas estándar.  
// - Escalabilidad: preparado para layouts responsivos con `rowSpacing` y `flexDirection` adaptados a breakpoints.  


import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import SharedAppBar from "./SharedAppBar/SharedAppBar";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";


const AppLayout = ({ children, isOptions, title, icon }: PropsWithChildren<AppLayoutProps>):React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={(theme: Theme) => ({
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: !appTheme ? theme.custom?.backgroundDark : theme.custom.white,
        backgroundSize: "cover",
        backgroundPosition: "center",
      })}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ height: "100%", width: "100vw" }}
        spacing={0}
      >
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          display={"flex"}
          flexDirection={'column'}
          alignItems={"center"}
          sx={{
            minWidth: { xs: "100%" },
          }}
        >
          <SharedAppBar showFilters={isOptions ? false : true} />
          <Grid
            container
            component="main"
            rowSpacing={{xs: 1, sm: 5}}
            sx={() => ({
              display: { xs: "flex"},
              flexDirection: { md: "column" },
              alignItems: { xs: "center"},
              justifyContent: "center",
              // minHeight: "100vh", 
              height: 'auto',
              width: "100vw"
            })}
          >
            <OptionsHeader isOptions={isOptions} title={title} icon={icon} appTheme={appTheme} />
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;
