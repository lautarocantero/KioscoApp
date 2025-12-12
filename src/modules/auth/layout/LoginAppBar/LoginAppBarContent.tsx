
// # Componente: LoginAppBarContent  

// ## Descripción 📦
// Contenido de la barra de navegación superior en la vista de login.  
// Renderiza un `Grid` que organiza los elementos de la barra: enlaces de login y el switch de modo claro/oscuro.  

// ## Funciones 🔧
// - `LoginAppBarContent`: componente principal que devuelve el contenido de la barra.  
//   - Usa `Grid` de MUI como contenedor flexible en dirección horizontal.  
//   - Ajusta estilos con `sx` según el tema (`Theme`), aplicando color blanco y reglas de justificación responsivas.  
//   - Incluye `LoginAppBarLinks` para mostrar enlaces de navegación.  
//   - Incluye `LightMode` para alternar entre modo claro y oscuro.  

// ## Notas técnicas 💽
// - Justificación: `flex-end` en pantallas pequeñas, `space-between` en pantallas medianas o mayores.  
// - Se integra dentro de `LoginAppBar` como parte de la barra superior.  

import { Grid, type Theme } from "@mui/material";
import LoginAppBarLinks from "./LoginAppBarLinks";
import LightMode from "../../../shared/components/LightMode/LightMode";

const LoginAppBarContent = (): React.ReactNode => {
  return (
    <Grid
      container
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        justifyContent: { xs: "flex-end", md: "space-between" },
      })}
    >
      <LoginAppBarLinks />
      <LightMode />
    </Grid>
  );
};

export default LoginAppBarContent;
