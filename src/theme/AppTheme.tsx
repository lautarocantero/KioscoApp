
// # Componente: AppTheme  

// ## Descripción 📦  
// Componente de alto nivel que provee el **tema global** de la aplicación usando `ThemeProvider` de Emotion y Material UI.  
// Permite alternar entre **lightTheme** y **darkTheme** según el valor de `appTheme` en el contexto.  

// ## Props 🔧  
// - `children`: elementos React que estarán envueltos por el proveedor de tema.  

// ## Lógica 🎭  
// - Obtiene `appTheme` desde `ThemeContext`.  
// - Si `appTheme` es `true`: aplica `lightTheme`.  
// - Si `appTheme` es `false`: aplica `darkTheme`.  
// - Incluye `CssBaseline` para normalizar estilos y asegurar consistencia visual en todos los navegadores.  

// ## Uso 🚀  
// ```tsx
// <AppTheme>
//   <App />   // Tu aplicación completa
// </AppTheme>
// ```  

// ## Notas técnicas 💽  
// - **ThemeContext**: centraliza el estado del tema (light/dark).  
// - **Escalabilidad**: se pueden añadir más temas (ej. high-contrast) y extender `ThemeContext`.  
// - **Consistencia visual**: `CssBaseline` asegura que todos los componentes de MUI se rendericen con estilos base uniformes.  


import { ThemeProvider } from "@emotion/react"
import { CssBaseline } from "@mui/material"
import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";
import { darkTheme, lightTheme } from "./mainTheme";

export const AppTheme = ({children}: {children: React.ReactNode}) => {
    const {appTheme} = useContext(ThemeContext);
    
    return (
        <ThemeProvider theme={appTheme ? lightTheme : darkTheme}>
            <CssBaseline />
                {children}
        </ThemeProvider>
    )
}