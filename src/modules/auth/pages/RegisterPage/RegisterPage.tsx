
// # Componente: RegisterPage  

// ## Descripción 📦
// Página principal de registro de usuario.  
// Renderiza el título y el formulario de registro dentro de `AuthLayout`.  

// ## Funciones 🔧
// - `RegisterPage`: componente principal de la vista de registro.  
//   - Usa `AuthLayout` como contenedor general para mantener consistencia visual.  
//   - Renderiza `AuthTitle` como encabezado animado.  
//   - Incluye `RegisterForm` para manejar el flujo de registro de usuario.  

// ## Notas técnicas 💽
// - Mantiene la misma estructura modular que `LoginPage` para coherencia en el sistema de autenticación.  
//-----------------------------------------------------------------------------//


import AuthLayout from "../../layout/AuthLayout";
import AuthTitle from "../LoginPage/components/LoginFormComponent/AuthTitle";
import RegisterForm from "./components/RegisterForm";

const RegisterPage = (): React.ReactNode  => {
  return (
    <AuthLayout>
      <AuthTitle />
      <RegisterForm />
    </AuthLayout>
  );
};

export default RegisterPage;
