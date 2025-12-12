
// # Componente: LightMode  

// ## Descripción 📦  
// Componente que permite alternar entre modo claro y oscuro en la aplicación.  
// Utiliza el `ThemeContext` para acceder y modificar el estado global del tema (`appTheme`).  
// Al hacer clic, invierte el valor del tema y lo guarda en `localStorage` para persistencia entre sesiones.  

// ## Lógica 🔧  
// - `useContext(ThemeContext)`: obtiene `appTheme` y `setAppTheme`.  
// - `onClick`:  
//   - Cambia el valor de `appTheme` (`true/false`).  
//   - Actualiza `localStorage` con el nuevo estado.  
// - Íconos:  
//   - `Brightness4`: representa el modo claro.  
//   - `ModeNight`: representa el modo oscuro.  
//   - El color de cada ícono depende del estado actual (`appTheme`).  

// ## Renderizado 🎨  
// - Contenedor `Grid`:  
//   - Fondo translúcido (`blackTranslucid` o fallback rgba).  
//   - Bordes redondeados, cursor tipo puntero y espaciado interno.  
//   - Diseño flexible con íconos alineados horizontalmente.  
// - Íconos adaptados al tema:  
//   - Se colorean dinámicamente según el estado (`appTheme`).  
//   - Tamaño reducido para integrarse en la UI sin ocupar demasiado espacio.  

// ## Notas técnicas 💽  
// - Persistencia: el estado del tema se guarda en `localStorage` para mantener la preferencia del usuario.  
// - Accesibilidad: incluye `aria-label="cambiar modo de tema"`.  
// - Se integra en layouts o toolbars como control de personalización visual.  


import { Brightness4, ModeNight } from "@mui/icons-material";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { Grid, type Theme } from "@mui/material";

const LightMode = () => {
  const { appTheme, setAppTheme } = useContext(ThemeContext);

  return (
    <Grid
      container
      display={"flex"}
      alignItems={"center"}
      aria-label="cambiar modo de tema"
      sx={(theme: Theme) => ({
        backgroundColor: theme?.custom?.blackTranslucid || "rgba(0,0,0,0.6)",
        borderRadius: "1em",
        cursor: "pointer",
        gap: 1,
        height: 'auto',
        padding: "0.2em 0.5em",
      })}
      onClick={() => {
        setAppTheme((prev: boolean) => !prev);
        localStorage.setItem("appTheme", JSON.stringify(!appTheme));
      }}
    >
      <Brightness4
        sx={(theme: Theme) =>({
          color: appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
          height: '0.8em',
        })}
      />
      <ModeNight
        sx={(theme: Theme) =>({
          color: !appTheme ? theme?.custom?.white : theme?.custom?.blackTranslucid,
          height: '0.8em',
        })}
      />
    </Grid>
  );
};

export default LightMode;
