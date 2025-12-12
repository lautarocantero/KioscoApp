
// # Configuración de Temas: darkTheme & lightTheme  

// ## Descripción 📦  
// Definición de dos temas globales para la aplicación usando `createTheme` de Material UI.  
// Se extiende la interfaz `Theme` para incluir propiedades personalizadas (`custom`) y se habilitan opciones experimentales (`unstable_sx`, `unstable_grid`).  

// ## Extensión de Theme 🔧  
// - Se añade la propiedad `custom` con colores y estilos adicionales:  
//   - `white`, `whiteTranslucid`, `black`, `blackTranslucid`  
//   - `lightMain`, `darkSecondary`  
//   - `fontColor`, `fontColorTransparent`, `fontColorDark`, `fontColorDarkTransparent`  
//   - `backgroundLigth`, `background`, `backgroundDark`  

// ## darkTheme 🎭  
// - **Paleta**:  
//   - `primary.main`: `#0386EE`  
//   - `secondary.main`: `#0058AF`  
//   - `error.main`: `#842325`  
// - **Custom**: tonos oscuros y contrastados (`black`, `backgroundDark`, `fontColor` claro).  
// - **Tipografía**:  
//   - Fuente: `'Montserrat', sans-serif`  
//   - Tamaños consistentes para `h1`–`h5`, `body1`, `body2`, `caption`.  

// ## lightTheme 🎭  
// - **Paleta**:  
//   - `primary.main`: `#F58388`  
//   - `secondary.main`: `#DD767B`  
//   - `error.main`: `#842325`  
// - **Custom**: tonos claros y suaves (`background: #FFFFFF`, `fontColor` oscuro).  
// - **Tipografía**:  
//   - Fuente: `'Montserat', sans-serif` (⚠️ posible typo, debería ser `'Montserrat'`).  
//   - Misma jerarquía de tamaños que en `darkTheme`.  

// ## Notas técnicas 💽  
// - **Consistencia visual**: ambos temas comparten estructura tipográfica y propiedades `custom`.  
// - **Escalabilidad**: se pueden añadir más propiedades en `custom` para branding o estilos específicos.  
// - **Accesibilidad**: la diferenciación clara entre `darkTheme` y `lightTheme` asegura contraste adecuado en UI.  
// - **Detalle**: se habilita `unstable_grid.cssGrid` para usar la nueva versión de Grid (v3).  

// ## Uso 🚀  
// ```tsx
// <ThemeProvider theme={darkTheme}>
//   <App />
// </ThemeProvider>
// ```  
// o alternar dinámicamente con `lightTheme` según el contexto (`ThemeContext`).  


import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      white: string;
      whiteTranslucid: string;
      black: string;
      blackTranslucid: string;
      lightMain: string;
      darkSecondary: string;
      fontColor: string;
      fontColorTransparent: string;
      fontColorDark: string,
      fontColorDarkTransparent: string,
      backgroundLigth: string;
      background: string;
      backgroundDark: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      white?: string;
      whiteTranslucid?: string;
      black?: string;
      blackTranslucid?: string;
      lightMain?: string;
      darkSecondary?: string;
      fontColor?: string;
      fontColorTransparent?: string;
      fontColorDark?: string,
      fontColorDarkTransparent?: string,
      backgroundLigth?: string;
      background?: string;
      backgroundDark?: string;
    };
    unstable_grid?: {
      cssGrid?: boolean;
    };
    unstable_sx?: boolean;
  }
}

export const darkTheme = createTheme({
  unstable_sx: true,
  unstable_grid: {
    cssGrid: true, // ✅ activa Grid v3
  },
  palette: {
    primary: {
      main: '#0386EE',
    },
    secondary: {
      main: '#0058AF',
    },
    error: {
      main: '#842325',
  },
  },
  custom: {
    white: '#eff0f8',
    whiteTranslucid: '#eff0f826',
    black: '#333333',
    blackTranslucid: '#09090966',
    lightMain: '#66A3FB',
    darkSecondary: '#00357E',
    fontColor: '#eff0f8',
    fontColorTransparent: '#eff0f842',
    fontColorDark: '#333333',
    fontColorDarkTransparent: '#09090966',
    backgroundLigth: '#525253ff',
    background: '#333333',
    backgroundDark: '#131316d2',
  },
  typography: {
    fontFamily: `'Montserrat', sans-serif`,
    htmlFontSize: 16,
    fontSize: 16,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
});

export const lightTheme = createTheme({
  unstable_sx: true,
  unstable_grid: {
    cssGrid: true, // ✅ activa Grid v3
  },
  palette: {
    primary: {
      main: '#F58388',
    },
    secondary: {
      main: '#DD767B',
    },
    error: {
      main: '#842325',
  },
  },
  custom: {
    white: '#eff0f8',
    whiteTranslucid: '#eff0f826',
    black: '#333333',
    blackTranslucid: '#09090966',
    lightMain: '#FCA4A7',
    fontColor: '#333333',
    fontColorTransparent: '#3333333d',
    darkSecondary: '#C0676B',
    // backgroundLigth: '#FCA4A7',
    backgroundLigth: '#bbbbbbff',
    background: '#FFFFFF',
    backgroundDark: '#e3e3e399',
  },
  typography: {
    fontFamily: `'Montserat', sans-serif`,
    htmlFontSize: 16,
    fontSize: 16,
    h1: {
      fontSize: '3rem',
      fontWeight: 700,
    },
    h2: {
      fontSize: '2.5rem',
      fontWeight: 600,
    },
    h3: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 400,
    },
    body1: {
      fontSize: '1.2rem',
    },
    body2: {
      fontSize: '0.875rem',
    },
    caption: {
      fontSize: '0.75rem',
    },
  },
});
