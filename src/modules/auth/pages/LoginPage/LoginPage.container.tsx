
// # Componente: LoginPageContainer  

// ## Descripción 📦
// Contenedor principal de la página de login.  
// Renderiza directamente el componente `LoginPage`.  

// ## Funciones 🔧
// – `LoginPageContainer`: componente simple que devuelve la vista de login.  
  //  - No recibe props ni maneja lógica adicional.  
  //  - Sirve como wrapper para mantener la arquitectura modular y clara.  

// // ## Notas técnicas 💽
// – Facilita la separación entre contenedor y vista (`LoginPage`).  
// – Útil para mantener consistencia en la estructura de páginas dentro del proyecto.  
//-----------------------------------------------------------------------------//


import LoginPage from "./LoginPage";

const LoginPageContainer = (): React.ReactNode => {

  return <LoginPage />;
};

export default LoginPageContainer;
