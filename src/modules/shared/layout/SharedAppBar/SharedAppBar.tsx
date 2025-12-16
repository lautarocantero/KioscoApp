//─────────────────── Componente 🧩: SharedAppBar ───────────────────//

//─────────────────── Descripción 📝 ───────────────────//
// Es la barra comun usada por el layout
// contiene titulo para ir al home, cambio a modo nocturno
// buscador, filtros y boton para agregar al carrito

//──────────────────── Funciones 🔧 ─────────────────────//
// - `SharedAppBar`: componente principal que recibe props tipadas con `SharedAppBarInterface`.  
//   - `showFilters`: booleano para mostrar o no el dialog.  
// - Renderiza:  
//   - `AppBar`: barra que muestra informacion del sitio.  

//─────────────────── Notas técnicas 💽  ───────────────────//
// Se memoriza el componente para evitar re-renderizaciones.

import { AppBar, Toolbar, type Theme } from "@mui/material";
import React from "react";
import type { SharedAppBarInterface } from "../../../../typings/ui/uiModules";
import SharedAppBarContent from "./SharedAppBarContent";

const SharedAppBar = ({showFilters}: SharedAppBarInterface): React.ReactNode => {
  
  return (
    <AppBar
      position="fixed"
      component={"nav"}
      elevation={0}
      sx={(theme: Theme) => ({ 
        width: "100%",
        backgroundColor: theme?.custom?.blackTranslucid,
        /*─────────────────── 🔎 si muestro los filtros, expandir el appbar 🔎 ───────────────────*/
        height: { xs: showFilters ? '4em' : 'auto'},
      })}
      data-testid="login-appbar"
    >
      <Toolbar style={{ minHeight: 'auto'}}>
        <SharedAppBarContent showFilters={showFilters}/>
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(SharedAppBar);
