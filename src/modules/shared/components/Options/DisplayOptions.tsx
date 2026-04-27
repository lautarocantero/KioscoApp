
// # Componente: DisplayOptions  

// ## Descripción 📦  
// Componente genérico para mostrar un conjunto de opciones dentro de un layout.  
// Envuelve las opciones en `AppLayout` y utiliza `OptionsList` para renderizar los enlaces o acciones disponibles.  
// Se emplea en distintas páginas del módulo (ej. Ventas, Historial) para mantener consistencia visual y estructural.  

// ## Lógica 🔧  
// - Props (`DisplayOptionsInterface`):  
//   - `title`: título de la sección.  
//   - `icon`: ícono representativo de la sección.  
//   - `links`: lista de opciones con descripción, ícono y URL.  
//   - `disconnect`: acción opcional para cerrar sesión o desconectar.  
// - Renderizado:  
//   - `AppLayout`: contenedor principal con soporte para vistas de opciones (`isOptions`).  
//   - `Grid`: organiza las opciones en columna, con espaciado y ancho fijo.  
//   - `OptionsList`: recibe `links` y `disconnect` para mostrar las opciones interactivas.  

// ## Notas técnicas 💽  
// - Modularidad: separa la lógica de layout (`AppLayout`) de la lista de opciones (`OptionsList`).  
// - Flexibilidad: puede reutilizarse en distintos contextos cambiando `title`, `icon` y `links`.  
// - Estilos: usa `sx` para definir ancho, margen inferior y comportamiento de flex-wrap.  


import { Grid } from "@mui/material";
import type { DisplayOptionsInterface } from "../../../../typings/ui/uiModules";
import AppLayout from "../../layout/AppLayout";
import OptionsList from "./OptionsList";

const DisplayOptions = ({ title, icon, links, disconnect }: DisplayOptionsInterface): React.ReactNode => {
  return (
    <AppLayout isOptions title={title} icon={icon ?? null}>
      <Grid
        container
        display="flex"
        flexDirection="column"
        spacing="1em"
        sx={{
          width: { xs: '98%', sm: '90%', md: '720px' },
          mb: '1em',
          flexWrap: 'wrap',
        }}
      >
        <OptionsList links={links} disconnect={disconnect ?? undefined} />
      </Grid>
    </AppLayout>
  );
};

export default DisplayOptions;