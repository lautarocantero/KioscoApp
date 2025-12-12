
// # Componente: InitialFormState  

// ## Descripción 📦
// Contenedor inicial para la vista de autenticación.  
// Renderiza los botones de inicio (`InitialFormButtons`) dentro de un `Grid` cuando el formulario aún no está visible.  

// ## Funciones 🔧
// - `InitialFormState`: componente principal que controla la visibilidad del formulario.  
//   - Recibe `showForm` y `setShowForm` desde `FormVisibilityState`.  
//   - Si `showForm` es `true`, retorna `null` (no renderiza nada).  
//   - Si `showForm` es `false`, muestra un `Grid` con `InitialFormButtons`.  

// ## Notas técnicas 💽
// - Usa `Grid` de MUI con disposición en columna.  
// - Delegación: `InitialFormButtons` maneja las acciones de login y registro.  
//-----------------------------------------------------------------------------//

import InitialFormButtons from "./InitialFormButtons";
import type { FormVisibilityState } from "../../../../../../typings/auth/authComponentTypes";
import { Grid } from "@mui/material";

const InitialFormState = ({ showForm, setShowForm }: FormVisibilityState): React.ReactNode | null => {
  if (showForm) {
    return null;
  }

  return (
    <Grid
      container
      display={'flex'}
      flexDirection={'column'}
    >
      <InitialFormButtons setShowForm={setShowForm} />
    </Grid>
  );
};

export default InitialFormState;
