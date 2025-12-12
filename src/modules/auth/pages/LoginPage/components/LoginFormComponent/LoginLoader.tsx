
// # Componente: LoginLoader  

// ## Descripción 📦
// Pantalla de carga para la vista de login.  
// Renderiza un mensaje de bienvenida, descripción y un indicador de progreso (`CircularProgress`).  

// ## Funciones 🔧
// - `LoginLoader`: componente principal que devuelve el loader de autenticación.  
//   - Usa `Grid` de MUI como contenedor con estilos responsivos.  
//   - Muestra un título (`Typography h2`) con el texto "Bienvenido a Kiosco!".  
//   - Incluye un subtítulo descriptivo y un `CircularProgress` como indicador visual de carga.  

// ## Notas técnicas 💽
// - Estilos dinámicos con `Theme`: color de fuente y fondo (`custom.fontColor`, `custom.backgroundDark`).  
// - Fondo transparente en móviles y oscuro en pantallas medianas/grandes (con fallback RGBA).  
//-----------------------------------------------------------------------------//


import { CircularProgress, Typography, Grid, type Theme } from "@mui/material";

const LoginLoader = (): React.ReactNode => {
  return (
    <Grid
      container
      rowSpacing={15}
      sx={(theme: Theme) => ({
        display: { xs: "flex", md: "flex" },
        flexDirection: { md: "column" },
        alignItems: { xs: "center" },
        width: { xs: "100%", sm: "90%", md: "80%" },
        justifyContent: "center",
        margin: "auto",
        padding: "3em 0",
        borderRadius: { xs: "0", md: "1em" },
        color: theme?.custom?.fontColor,
        backgroundColor: {
          xs: "transparent",
          md: theme.custom?.backgroundDark || "rgba(0,0,0,0.6)", // Fallback opcional
        },
      })}
    >
      <Typography
        variant="h2"
        sx={(theme: Theme) => ({
          fontSize: theme?.typography?.h2?.fontSize,
        })}
      >
        Bienvenido a Kiosco!
      </Typography>
      <Typography>La mejor forma de gestionar tu local minorista</Typography>
      <CircularProgress />
    </Grid>
  );
};

export default LoginLoader;
