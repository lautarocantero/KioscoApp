
// # Componente: RegisterFormButtons  

// ## Descripción 📦
// Botón principal del formulario de registro.  
// Renderiza un `PrimaryButton` dentro de un `Grid` con estilos centrados y responsivos.  

// ## Funciones 🔧
// - `RegisterFormButtons`: componente que muestra el botón de acción "Registrarse".  
//   - Usa `Grid` de MUI como contenedor flexible y centrado.  
//   - Renderiza `PrimaryButton` con tipo `submit`.  
//   - Ajusta el color del botón según la presencia de errores (`default` si no hay, `error` si existen).  

// ## Notas técnicas 💽
// - Recibe `errors` desde `RegisterFormButtonsInterface` para validar estado visual.  
// - Ancho del botón adaptado a breakpoints (`xs`, `sm`, `md`).  
//-----------------------------------------------------------------------------//


import { Grid } from "@mui/material";
import type { RegisterFormButtonsInterface } from "../../../../../typings/auth/authComponentTypes";
import PrimaryButton from "../../../../shared/components/Buttons/PrimaryButtonComponent";

const RegisterFormButtons = ({ errors }: RegisterFormButtonsInterface): React.ReactNode => {
  return (
    <Grid
      sx={{
        mt: '1em',
        width: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
      }}
    >
      <PrimaryButton
        buttonText="Registrarse"
        buttonType="submit"
        buttonOnClick={() => {}}
        buttonWidth={{ xs: "100%", sm: "50%", md: "40%" }}
        buttonColor={Object.keys(errors).length === 0 ? "default" : "error"}
        padding={0.1}
      />
    </Grid>
  );
};

export default RegisterFormButtons;
