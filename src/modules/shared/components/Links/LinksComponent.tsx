
// # Componente: LinksComponent  

// ## Descripción 📦  
// Renderiza una lista de enlaces (`Link`) estilizados con MUI y enlazados mediante `react-router-dom`.  
// Cada enlace se adapta a los breakpoints definidos en `Breakpoint` para controlar la decoración del texto.  

// ## Lógica 🔧  
// - Props (`LinksComponentInterface`):  
//   - `linksToShow`: array de objetos tipados con `LinkInterface`.  
//     - `label`: texto visible del enlace.  
//     - `to`: ruta destino.  
//     - `underline`: configuración de subrayado según breakpoint (`xs`, `md`).  
// - Iteración:  
//   - Se recorre `linksToShow` con `.map`.  
//   - Cada enlace se renderiza como un `Link` de MUI con `component={LinkReactRouter}` para navegación interna.  
// - Estilos dinámicos:  
//   - `fontSize`: adaptado al `caption` del tema.  
//   - `textDecoration`: controlado por `Breakpoint`.  
//   - `color`: tomado de `theme.custom.fontColor`.  

// ## Notas técnicas 💽  
// - **Bug actual**: dentro del `.map`, el `return` está implícito pero no se está devolviendo el JSX (falta `return`).  
//   - Solución: usar `return (...)` dentro del `.map` o eliminar las llaves `{}` y usar paréntesis `()` directamente.  
//   ```tsx
//   {linksToShow.map((link: LinkInterface) => (
//     <Link key={link.to} ...>{link.label}</Link>
//   ))}
//   ```  
// - Modularidad: puede reutilizarse en headers, footers o layouts para mostrar enlaces dinámicos.  
// - Accesibilidad: cada enlace incluye `aria-label` con el texto del enlace.  

import { Link, type Theme } from "@mui/material";
import { Link as LinkReactRouter } from "react-router-dom";
import type { LinkInterface, LinksComponentInterface } from "../../../../typings/ui/uiModules";
import { Breakpoint } from "../../../../typings/ui/ui";

const LinksComponent = ({ linksToShow }: LinksComponentInterface): React.ReactNode => {
  return (
    <>
      {linksToShow.map((link: LinkInterface) => {
        const {label, to, underline} = link;
        (
          <Link
            key={to}
            aria-label={label}
            component={LinkReactRouter}
            to={to}
            sx={{
              fontSize: (theme: Theme) => theme?.typography?.caption?.fontSize,
              textDecoration: { [Breakpoint.Xs]: underline.xs, [Breakpoint.Md]: underline.md },
              color: (theme: Theme) => theme?.custom?.fontColor,
            }}
          >
            {label}
          </Link>
      )})}
    </>
  );
};

export default LinksComponent;
