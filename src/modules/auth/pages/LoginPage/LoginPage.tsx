
// # Componente: LoginPage  

// ## Descripción 📦
// Página principal de login que organiza el layout de autenticación.  
// Renderiza el título y el formulario de login dentro de `AuthLayout`, con carga diferida y animación de fallback.  

// ## Funciones 🔧
// - `LoginPage`: componente principal de la vista de login.  
//   - Usa `AuthLayout` como contenedor general.  
//   - Implementa `Suspense` para carga diferida del formulario (`LoginFormHandler`).  
//   - Muestra `LoginLoader` como fallback mientras se carga el formulario.  
//   - Renderiza `AuthTitle` y luego `LoginFormHandler`.  

// ## Notas técnicas 💽
// - `LoginFormHandler` se importa dinámicamente con `lazy` para optimizar rendimiento.  
// - `LoginLoader` provee feedback visual durante la carga.  
//-----------------------------------------------------------------------------//


import { lazy, Suspense } from "react";
import AuthLayout from "../../layout/AuthLayout";
import LoginLoader from "./components/LoginFormComponent/LoginLoader";
import AuthTitle from "./components/LoginFormComponent/AuthTitle";

const LoginFormHandler = lazy(
  () => import("./components/LoginFormComponent/LoginFormHandler")
);

const LoginPage = (): React.ReactNode => {
  return (
    <AuthLayout>
      <Suspense fallback={<LoginLoader />}>
        <AuthTitle />
        <LoginFormHandler />
      </Suspense>
    </AuthLayout>
  );
};

export default LoginPage;
