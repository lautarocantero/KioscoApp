
// # Componente: InitialFormButtons  

// ## Descripción 📦
// Conjunto de botones iniciales para la vista de autenticación.  
// Renderiza un `Grid` con dos botones: `PrimaryButton` para iniciar sesión y `EmptyButton` para registrarse.  

// ## Funciones 🔧
// - `InitialFormButtons`: componente principal que devuelve el bloque de botones.  
//   - Usa `Grid` de MUI con disposición en columna y centrado.  
//   - `PrimaryButton`: muestra "Iniciar sesión" y activa `setShowForm(true)`.  
//   - `EmptyButton`: muestra "Registrarse" y navega a la ruta `/register` mediante `useNavigate`.  

// ## Notas técnicas 💽
// - Test ID: `introduction-login-button` para pruebas unitarias del botón de login.  
// - Recibe `setShowForm` desde `FormToggleButtonInterface` para alternar el formulario de login.  
//-----------------------------------------------------------------------------//


import { Grid } from "@mui/material";
import PrimaryButton from "../../../../../shared/components/Buttons/PrimaryButtonComponent";
import { useNavigate } from "react-router-dom";
import type { FormToggleButtonInterface } from "../../../../../../typings/auth/authComponentTypes";
import EmptyButton from "../../../../../shared/components/Buttons/EmptyButton";


const InitialFormButtons = ({ setShowForm }: FormToggleButtonInterface): React.ReactNode => {
  const handleNavigate = useNavigate();
  
  return (
    <Grid 
      component={"div"} 
      display={"flex"} 
      flexDirection={"column"} 
      alignItems={'center'}
      gap={3}
    >
      <PrimaryButton
        buttonText={"Iniciar sesión"}
        buttonOnClick={() => {
          setShowForm?.(true);
        }}
        buttonWidth={{xs: "15em", md: '10em'}}
        padding={0.3}
        dataTestId='introduction-login-button'
      />
      <EmptyButton
        buttonText={"Registrarse"}
        buttonOnClick={() => {
          handleNavigate("/register");
        }}
      />
    </Grid>
  );
};

export default InitialFormButtons;
