
// # Componente: LoginAppBarLinks  

// ## Descripción 📦
// Renderiza los enlaces de navegación dentro de la barra superior de login.  
// Muestra las opciones "Inicio de sesión" y "Registro" con estilos responsivos y subrayado dinámico según la ruta actual.  

// ## Funciones 🔧
// - `getAvailableLinks(pathname: string)`:  
//   Genera un arreglo de enlaces (`LinkInterface[]`) con configuración de subrayado.  
//   - Si la ruta actual coincide con `/login`, subraya "Inicio de sesión" en pantallas medianas o mayores.  
//   - Si la ruta actual coincide con `/register`, subraya "Registro" en pantallas medianas o mayores.  
//   - En pantallas pequeñas (`Xs`), no se aplica subrayado.  
//
// - `LoginAppBarLinks`:  
//   Componente principal que:  
//   - Obtiene la ruta actual mediante `useLocation`.  
//   - Renderiza un `Grid` de MUI en dirección horizontal, oculto en pantallas pequeñas y visible en medianas o mayores.  
//   - Aplica color de fuente desde el tema (`Theme`).  
//   - Renderiza `LinksComponent` con los enlaces generados por `getAvailableLinks`.  

// ## Notas técnicas 💽
// - Usa `Breakpoint` y `UnderlineVariant` para definir comportamiento responsivo del subrayado.  
// - Se integra dentro de `LoginAppBarContent` como parte de la barra superior de login.  
//-----------------------------------------------------------------------------//

import { Grid, type Theme } from "@mui/material";
import LinksComponent from "../../../shared/components/Links/LinksComponent";
import { useLocation } from "react-router-dom";
import type { LinkInterface } from "../../../../typings/ui/uiModules";
import { Breakpoint, UnderlineVariant } from "../../../../typings/ui/ui";

const getAvailableLinks = (pathname: string) : LinkInterface[] => [
  {
    label: "Inicio de sesión",
    to: "/login",
    underline: {
      [Breakpoint.Xs]: UnderlineVariant.None,
      [Breakpoint.Md]: pathname === "/login"
        ? UnderlineVariant.Underline
        : UnderlineVariant.None,
    },
  },
  {
    label: "Registro",
    to: "/register",
    underline: {
      [Breakpoint.Xs]: UnderlineVariant.None,
      [Breakpoint.Md]: pathname === "/register"
        ? UnderlineVariant.Underline
        : UnderlineVariant.None,
    },
  },
];

const LoginAppBarLinks = (): React.ReactNode => {
  const location = useLocation();

  return (
    <Grid
      component="div"
      display={{ xs: "none", md: "flex" }}
      flexDirection="row"
      gap={2}
      sx={{
        color: (theme: Theme) => theme?.custom?.fontColor,
      }}
    >
      <LinksComponent linksToShow={getAvailableLinks(location.pathname)} />
    </Grid>
  );
};

export default LoginAppBarLinks;
