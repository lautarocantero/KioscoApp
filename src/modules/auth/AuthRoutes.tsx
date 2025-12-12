
// # Componente: AuthRoutes  

// ## Descripción 📦
// Definición de rutas para el flujo de autenticación.  
// Renderiza las páginas de login y registro, con redirección automática a la raíz en rutas no válidas.  

// ## Rutas 🛣️
// ┌───────────────────────────────┐
// │ "/"         → LoginPage        │
// │ "/register" → RegisterPage     │
// │ "*"         → Redirect to "/"  │
// └───────────────────────────────┘

// ## Notas técnicas 💽
// - Usa `react-router-dom` para la gestión de rutas.  
// - Mantiene consistencia modular separando páginas (`LoginPage`, `RegisterPage`).  
//-----------------------------------------------------------------------------//


import { Navigate, Route } from "react-router-dom"
import { LoginPage } from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage/RegisterPage";

const AuthRoutes = ():React.ReactNode => {

    return (
        <>
            <Route path="/" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="*" element={<Navigate to="/" />} />
        </>
    )
}

export default AuthRoutes;