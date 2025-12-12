
// # Componente: EmptyButton  

// ## Descripción 📦  
// Botón estilizado con fondo transparente, pensado para acciones secundarias o alternativas dentro de la interfaz.  
// Permite personalizar el texto, la acción al hacer clic y el ancho del botón.  

// ## Lógica 🔧  
// - Props (`EmptyButtonProps`):  
//   - `buttonText`: texto visible dentro del botón.  
//   - `buttonOnClick`: función ejecutada al hacer clic.  
//   - `buttonWidth`: ancho del botón (por defecto `"280px"`).  
// - Renderiza un `Button` de MUI con estilos personalizados:  
//   - Fondo transparente.  
//   - Color de fuente definido por el tema (`fontColorTransparent`).  
//   - Bordes redondeados (`borderRadius: 35`).  
//   - Tipografía adaptada al estilo `body2`.  
//   - Texto sin transformación (`textTransform: "none"`).  

// ## Notas técnicas 💽  
// - Se integra como botón secundario en pantallas donde se requiere una acción menos destacada.  
// - Mantiene consistencia visual al usar estilos dinámicos basados en `Theme`.  
// - Accesibilidad: incluye `role="button"` para reforzar semántica en lectores de pantalla.  


import { Button, type Theme } from "@mui/material";
import type { EmptyButtonProps } from "../../../../typings/ui/uiModules";


const EmptyButton = ({
  buttonText,
  buttonOnClick,
  buttonWidth = "280px",
}: EmptyButtonProps): React.ReactNode => {
  return (
    <Button
      sx={{
        backgroundColor: "transparent",
        color: (theme: Theme) => theme?.custom?.fontColorTransparent,
        width: buttonWidth,
        borderRadius: 35,
        padding: 1,
        textTransform: "none",
        fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
      }}
      onClick={buttonOnClick}
      role="button"
    >
      {buttonText}
    </Button>
  );
};

export default EmptyButton;
