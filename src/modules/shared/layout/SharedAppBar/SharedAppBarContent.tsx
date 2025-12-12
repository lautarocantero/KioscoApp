
// # Componente: SharedAppBarContent  

// ## Descripción 📦  
// Contenido principal de la barra superior compartida (`AppBar`) de la aplicación.  
// Renderiza el título de la aplicación ("Kiosco"), el control de cambio de tema (`LightMode`) y opcionalmente los filtros (`Filters`).  
// Se integra en el layout global para mantener consistencia visual y funcional en todas las vistas.  

// ## Lógica 🔧  
// - Props:  
//   - `showFilters`: booleano que determina si se renderiza el componente `Filters`.  
// - Contexto:  
//   - Usa `ThemeContext` para obtener `appTheme` y aplicar estilos dinámicos según el tema activo.  
// - Navegación:  
//   - Usa `useNavigate` de `react-router-dom` para redirigir al usuario a `/home` al hacer clic en el título.  

// ## Renderizado 🎨  
// - `Grid` contenedor principal:  
//   - Layout en columna, ancho completo.  
// - Subgrid superior:  
//   - Distribución en fila (`flexDirection: "row"`).  
//   - Ítems alineados al centro y justificados con espacio entre ellos.  
//   - Contiene:  
//     - `Typography`: título "Kiosco", clickeable para navegar a `/home`.  
//       - Color dinámico: oscuro (`#333333`) si `appTheme` es `true`, claro (`#eff0f8`) si es `false`.  
//       - Tipografía adaptada al tema (`h4`).  
//     - `LightMode`: control para alternar entre modo claro y oscuro.  
// - Subgrid inferior:  
//   - `Filters`: renderizado condicional según `showFilters`.  

// ## Notas técnicas 💽  
// - Modularidad: separa responsabilidades entre título, control de tema y filtros.  
// - Flexibilidad: `showFilters` permite ocultar o mostrar filtros según el contexto de la vista.  
// - Consistencia visual: estilos adaptados al tema global (`theme.custom`).  
// - Accesibilidad: título con `onClick` para navegación rápida y control de tema accesible.  


import { Grid, Typography, type Theme } from "@mui/material";
import LightMode from "../../components/LightMode/LightMode";
import { useContext } from "react";
import { ThemeContext } from "../../../../theme/ThemeContext";
import { useNavigate } from "react-router-dom";
import Filters from "./Filters";

const SharedAppBarContent = ({showFilters}: {showFilters: boolean}): React.ReactNode => {
  const { appTheme } = useContext(ThemeContext);
  const navigate = useNavigate();

  return (
    <Grid
        container
        display={'flex'}
        flexDirection={'column'}
        sx={{
          width: '100%',
        }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"row"}
        alignItems={"center"}
        width={"100%"}
        sx={(theme: Theme) => ({
          color: theme.custom?.white,
          justifyContent: "space-between",
        })}
      >
        <Typography 
          onClick={() => navigate('/home')}
          sx={(theme: Theme) => ({ 
            fontSize: theme?.typography?.h4,
            color: `${appTheme ? "#333333" : "#eff0f8"}`,
            lineHeight: 'none'
          })}>
            Kiosco
        </Typography>
        <LightMode />
      </Grid> 
      <Filters showFilters={showFilters}/>                       
    </Grid>
  );
};

export default SharedAppBarContent;
