
// # Componente: Filters  

// ## Descripción 📦  
// Contenedor de filtros que combina la barra de búsqueda (`AppbarSearch`) y el filtro de tipo (`AppbarFilter`).  
// Se muestra únicamente cuando la prop `showFilters` es verdadera, permitiendo ocultar los filtros en contextos donde no son necesarios.  

// ## Lógica 🔧  
// - Prop:  
//   - `showFilters`: booleano que determina si se renderiza el componente.  
// - Renderizado condicional:  
//   - Si `showFilters` es `false`, retorna un fragmento vacío.  
//   - Si `true`, renderiza un `Grid` con dos columnas:  
//     - Columna izquierda (`size={8}`): contiene `AppbarSearch`.  
//     - Columna derecha (`size={4}`): contiene `AppbarFilter`.  

// ## Renderizado 🎨  
// - `Grid` contenedor:  
//   - Layout en fila (`flexDirection: 'row'`).  
//   - Alineación centrada (`alignItems: 'center'`).  
//   - Justificación con espacio entre elementos (`justifyContent: 'space-between'`).  
//   - Color de texto blanco (`theme.custom.white`).  
//   - Margen superior/inferior (`0.3em 0`).  
//   - Altura fija (`20px`).  
// - Subgrids:  
//   - `AppbarSearch` ocupa 8 columnas.  
//   - `AppbarFilter` ocupa 4 columnas.  

// ## Notas técnicas 💽  
// - Modularidad: encapsula los filtros en un solo componente para fácil integración en `AppBar` o layouts.  
// - Flexibilidad: puede ocultarse dinámicamente según el contexto (`showFilters`).  
// - Consistencia visual: estilos adaptados al tema global (`theme.custom`).  


import { Grid, type Theme } from "@mui/material";
import { AppbarSearch } from "./AppBarSearch";
import { AppbarFilter } from "./AppBarFilter";

const Filters = ({showFilters}: {showFilters: boolean}) => {

  if(!showFilters) return (<></>);

  return (
    <Grid
      container
      spacing={2}
      display={"flex"}
      flexDirection={"row"}
      alignItems={"center"}
      width={"100%"}
      sx={(theme: Theme) => ({
        color: theme.custom?.white,
        justifyContent: "space-between",
        margin: '0.3em 0',
        height: '20px',
      })}
    >
      <Grid size={8}>
        <AppbarSearch />
      </Grid>
      <Grid size={4}>
        <AppbarFilter />
      </Grid>
    </Grid>
  )
}

export default Filters;