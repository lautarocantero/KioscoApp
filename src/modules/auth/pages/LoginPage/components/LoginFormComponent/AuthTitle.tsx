
// # Componente: AuthTitle  

// ## Descripción 📦
// Título animado utilizado en la vista de autenticación.  
// Renderiza un `Grid` con animación `pulse` que contiene `KioscoTitle`.  

// ## Funciones 🔧
// - `AuthTitle`: componente principal que devuelve el título del stoko.  
//   - Usa `Grid` de MUI como contenedor.  
//   - Aplica clases de `animate.css` para animación (`animate__animated animate__pulse`).  
//   - Renderiza el componente `KioscoTitle` dentro del contenedor.  

// ## Notas técnicas 💽
// - Se importa `animate.css` para efectos visuales.  
// - Pensado para pantallas de login/registro.  
//-----------------------------------------------------------------------------//


import { Grid } from "@mui/material";
import KioscoTitle from "./KioscoTitle";
import "animate.css";

const AuthTitle = (): React.ReactNode => {
  return (
    <Grid component={"div"} className="animate__animated animate__pulse">
      <KioscoTitle />
    </Grid>
  );
};

export default AuthTitle;
