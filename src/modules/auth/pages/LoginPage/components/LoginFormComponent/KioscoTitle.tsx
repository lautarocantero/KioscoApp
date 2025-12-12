
// # Componente: KioscoTitle  

// ## Descripción 📦
// Título principal del kiosco con ícono representativo.  
// Renderiza un `Typography` estilizado que combina texto y un ícono de tienda.  

// ## Funciones 🔧
// - `KioscoTitle`: componente principal que devuelve el título "Kiosco".  
//   - Usa `Typography` de MUI con estilo flexible y responsivo.  
//   - Aplica color dinámico desde el tema (`theme.custom.fontColor`).  
//   - Ajusta el tamaño de fuente según el breakpoint (`xs`, `md`).  
//   - Incluye `StoreMallDirectoryIcon` como ícono decorativo junto al texto.  

// ## Notas técnicas 💽
// - Variante tipográfica: `h1`.  
// - Ícono con `titleAccess="kiosco icon"` para accesibilidad.  
//-----------------------------------------------------------------------------//


import { Typography, type Theme } from "@mui/material";
import StoreMallDirectoryIcon from "@mui/icons-material/StoreMallDirectory";

const KioscoTitle = (): React.ReactNode => (
  <Typography 
    sx={{
      display: "flex",
      alignItems: "center",
      color: (theme: Theme) => theme?.custom?.fontColor,
      fontSize: { xs: '2em', md: '1em'},
      width: '100%',
    }}
    variant="h1">
    <span>
      Kiosco
    </span>
    <span>
      <StoreMallDirectoryIcon sx={{ fontSize: "2em" }} titleAccess="kiosco icon"/>
    </span>
  </Typography>
)

export default KioscoTitle;