
// # Contexto: ThemeContext  

// ## Descripción 📦  
// Contexto de React que centraliza el estado del **tema global** de la aplicación (light/dark).  
// Provee acceso a `appTheme` y a la función `setAppTheme` para alternar entre temas.  

// ## Interface 🔧  
// - **ThemeContextType**:  
//   - `appTheme`: booleano que indica el tema actual (`true` → light, `false` → dark).  
//   - `setAppTheme`: función para actualizar el estado del tema.  

// ## Implementación 🎭  
// - Se inicializa `appTheme` leyendo de `localStorage` con clave `"appTheme"`.  
//   - Si no existe, se usa `"true"` como valor por defecto.  
// - `setAppTheme`: función vacía por defecto, será reemplazada por el `Provider`.  

// ## Uso 🚀  
// ```tsx
// import { ThemeContext } from "./ThemeContext";
//
// const { appTheme, setAppTheme } = useContext(ThemeContext);
//
// // Alternar tema
// setAppTheme(prev => !prev);
// ```  

// ## Notas técnicas 💽  
// - **Persistencia**: el valor inicial de `appTheme` se obtiene de `localStorage`, asegurando que el tema se mantenga entre sesiones.  
// - **Escalabilidad**: se pueden añadir más configuraciones de tema (ej. paletas personalizadas, high-contrast).  
// - **Consistencia**: al centralizar el estado en `ThemeContext`, toda la aplicación puede reaccionar al cambio de tema de forma uniforme.  


import { createContext, type Dispatch, type SetStateAction } from "react";

interface ThemeContextType {
  appTheme: boolean;
  setAppTheme: Dispatch<SetStateAction<boolean>>;
}

export const ThemeContext = createContext<ThemeContextType>({
  appTheme: JSON.parse(localStorage.getItem("appTheme") ?? "true"),
  setAppTheme: () => {},
});