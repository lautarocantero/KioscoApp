
// # Componente: LightDarkThemeProvider  

// ## Descripción 📦  
// Proveedor de contexto que gestiona el estado global del **tema claro/oscuro** en la aplicación.  
// Envuelve a los componentes hijos y les da acceso a `appTheme` y `setAppTheme` mediante `ThemeContext`.  

// ## Props 🔧  
// - `children`: elementos React que estarán envueltos por el proveedor.  

// ## Lógica 🎭  
// - Usa `useState` para inicializar `appTheme`.  
// - El valor inicial se obtiene de `localStorage` con clave `"appTheme"`.  
//   - Si existe, se parsea con `JSON.parse`.  
//   - Si no existe, se usa `true` (tema claro por defecto).  
// - Provee `{ appTheme, setAppTheme }` a través de `ThemeContext.Provider`.  

// ## Uso 🚀  
// ```tsx
// <LightDarkThemeProvider>
//   <App />   // Tu aplicación completa
// </LightDarkThemeProvider>
// ```  

// ## Notas técnicas 💽  
// - **Persistencia**: el estado inicial se sincroniza con `localStorage`, asegurando que el tema se mantenga entre sesiones.  
// - **Escalabilidad**: se pueden añadir efectos (`useEffect`) para guardar cambios en `localStorage` cada vez que se actualice `appTheme`.  
// - **Consistencia**: centraliza el control del tema, permitiendo que toda la aplicación reaccione al cambio de forma uniforme.  


import { useState } from "react";
import { ThemeContext } from "./ThemeContext";

export const LightDarkThemeProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [appTheme, setAppTheme] = useState<boolean>(() => {
    const stored = localStorage.getItem("appTheme");
    return stored !== null ? JSON.parse(stored) : true;
  });
  return (
    <ThemeContext.Provider value={{ appTheme, setAppTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
