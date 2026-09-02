
// # Componente: LoginAppBar  

// ## Descripción 📦
// Barra de navegación superior utilizada en la vista de login.  
// Renderiza un `AppBar` fijo y transparente con un `Toolbar` que contiene `LoginAppBarContent`.  

// ## Funciones 🔧
// - `LoginAppBar`: componente principal que devuelve la barra de navegación.  
//   - Usa `AppBar` de MUI con estilo fijo, transparente y sin elevación.  
//   - Limita el ancho al 50% mediante `sx`.  
//   - Incluye un `Toolbar` que renderiza el contenido de login (`LoginAppBarContent`).  
// - `React.memo(LoginAppBar)`: optimiza el componente evitando renders innecesarios.  

// ## Notas técnicas 💽
// - Test ID: `login-appbar` para pruebas unitarias.  
// - Se importa `LoginAppBarContent` para mostrar acciones o elementos específicos del login.
//-----------------------------------------------------------------------------//

import { AppBar, Toolbar } from "@mui/material";
import React from "react";
import LoginAppBarContent from "./LoginAppBarContent";

const LoginAppBar = (): React.ReactNode => {
  return (
    <AppBar
      position="static"
      component={"nav"}
      color="transparent"
      elevation={0}
      sx={{ width: "100%" }}
      data-testid="login-appbar"
    >
      <Toolbar>
        <LoginAppBarContent />
      </Toolbar>
    </AppBar>
  );
};

export default React.memo(LoginAppBar);
