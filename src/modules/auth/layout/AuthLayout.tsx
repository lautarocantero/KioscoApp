
// # Componente: AuthLayout  

// ## Descripción 📦
// Layout principal para las vistas de autenticación.  
// Se encarga de definir el fondo, la estructura de columnas y el área principal donde se renderizan los children.  

// ## Funciones 🔧
// - `AuthLayout`: componente que recibe `children` y los renderiza dentro de un layout dividido en dos columnas.  
//   - Usa `ThemeContext` para determinar el tema actual (`appTheme`) y aplicar un fondo dinámico (imagen blanca o negra).  
//   - Si no hay children, muestra un mensaje con `Typography`: "No children Loaded...".  
//   - Renderiza un `Box` que ocupa toda la pantalla con imagen de fondo.  
//   - Dentro del `Box`, organiza un `Grid` con dos columnas:  
//     - Columna izquierda: vacía, usada para centrar el contenido principal a la derecha en pantallas grandes.  
//     - Columna derecha: contiene la barra superior (`LoginAppBar`) y el área principal (`main`) donde se renderizan los children.  
//   - El `main` aplica estilos responsivos: ancho variable, centrado, padding, bordes redondeados y fondo oscuro en pantallas pequeñas.  

// ## Notas técnicas 💽
// - Fondo dinámico: `/images/backgroundImages/blackBackgroundImage.jpg` o `/images/backgroundImages/whiteBackgroundImage.jpg` según el tema.  
// - Usa `Grid` de MUI para estructura responsiva.  
// - Integra `LoginAppBar` en la parte superior de la columna derecha.  
// - Children se renderizan dentro de un `Grid` con estilos adaptados al tema y al tamaño de pantalla.  
//-----------------------------------------------------------------------------//

import { Box, Typography, type Theme } from "@mui/material";
import { Grid } from "@mui/material";
import type { PropsWithChildren } from "react";
import React, { useContext } from "react";
import { ThemeContext } from "../../../theme/ThemeContext";
import LoginAppBar from "./LoginAppBar/LoginAppBar";

const AuthLayout = ({ children }: PropsWithChildren): React.ReactNode => {
  const { appTheme }: {appTheme: boolean} = useContext(ThemeContext);

  const backgroundUrl: string = `url(/images/backgroundImages/${
    !appTheme ? "black" : "white"
  }BackgroundImage.jpg)`;

  if (!children || React.Children.count(children) === 0)
    return <Typography>No children Loaded...</Typography>;

  return (
    <Box
      component={"div"}
      sx={{
        height: "100vh",
        width: "100vw",
        backgroundImage: backgroundUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        justifyContent={"space-between"}
        sx={{ height: "100vh", width: "100vw" }}
        spacing={0}
      >
        {/* este grid se utiliza para centrar a la derecha el main */}
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          sx={{
            display: { xs: "none", md: "block" },
            minWidth: { md: "50%" },
          }}
        ></Grid>
        <Grid
          component={"div"}
          spacing={{ xs: 12, sm: 6 }}
          display={"flex"}
          alignItems={"center"}
          sx={(theme: Theme) => ({
            backgroundColor: { md: theme.custom?.background },
            minWidth: { xs: "100%", md: "50%" },
            height: '100%',
          })}
        >
          <LoginAppBar />
          <Grid
            container
            component="main"
            sx={(theme: Theme) => ({
              display: { xs: "flex"},
              flexDirection: { xs: "column" },
              alignItems: { xs: "center", md: "center" },
              width: { xs: "90%", sm: "90%", md: "80%" },
              justifyContent: "center",
              margin: "auto",
              padding: "3em 0",
              borderRadius: { xs: "1em" },
              overflowX: "hidden",
              backgroundColor: {
                xs: theme.custom?.backgroundDark || "rgba(0,0,0,0.6)",
              },
            })}
          >
            {children}
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AuthLayout;
