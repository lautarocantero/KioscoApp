//─────────────────── Componente 🧩: AppLayout ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Layout principal que envuelve las páginas de la aplicación.
// Proporciona estructura, barra superior compartida y encabezado de opciones cuando corresponde.  

//──────────────────── Funciones 🔧 ─────────────────────//
// - AppLayout: componente principal.
//   - Recibe children, isOptions, title e icon.
//   - Usa ThemeContext para obtener appTheme.
//   - Si no hay children → muestra mensaje.
//   - Renderiza:
//     - Box: contenedor principal, ocupa toda la pantalla con fondo dinámico según tema.
//     - Grid: estructura en filas y columnas, distribuye contenido.
//     - SharedAppBar: barra superior, oculta filtros si isOptions es true.
//     - OptionsHeader: encabezado opcional con título e ícono.
//     - children: contenido principal de la página.

//─────────────────── Notas técnicas 💽 ───────────────────//
// - Este AppLayout se hizo teniendo en cuenta =>
// - Modularidad para separar responsabilidades entre SharedAppBar, OptionsHeader y contenido.
// - Flexibilidad que funciona tanto en páginas con opciones como en páginas estándar.
// - Esta preparado para layouts responsivos con rowSpacing y flexDirection adaptados a breakpoints.
//-----------------------------------------------------------------------------//


import { Box, Grid, Typography, type Theme } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import type { AppLayoutProps } from "../../../typings/ui/uiModules";
import OptionsHeader from "./components/OptionsHeader";
import SharedAppBar from "./SharedAppBar/SharedAppBar";

const AppLayout = ({ children, isOptions, title = "App", icon }: PropsWithChildren<AppLayoutProps>):React.ReactNode => {
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
              height: 'auto',
              width: "100vw"
            })}
          >
            <OptionsHeader 
              isOptions={isOptions} 
              title={title} 
              icon={icon} 
              appTheme={appTheme} 
            />
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AppLayout;
