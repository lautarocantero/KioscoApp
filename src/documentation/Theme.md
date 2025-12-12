// # 🎨 Theme System - Documentación esencial

// ## Extensión de Theme
// Se añade `custom` para centralizar colores clave:
// - white, black, lightMain, darkSecondary
// - fontColor, background, backgroundDark

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      white: string;
      black: string;
      lightMain: string;
      darkSecondary: string;
      fontColor: string;
      background: string;
      backgroundDark: string;
    };
  }
}

// ## darkTheme
// - Paleta: azul primario, secundario profundo.
// - Custom: colores oscuros, tipografía clara.
export const darkTheme = createTheme({
  palette: {
    primary: { main: '#0386EE' },
    secondary: { main: '#0058AF' },
  },
  custom: {
    white: '#eff0f8',
    black: '#333333',
    lightMain: '#66A3FB',
    darkSecondary: '#00357E',
    fontColor: '#eff0f8',
    background: '#333333',
    backgroundDark: '#131316d2',
  },
});

// ## lightTheme
// - Paleta: tonos rosados y secundarios suaves.
// - Custom: colores claros, tipografía oscura.
export const lightTheme = createTheme({
  palette: {
    primary: { main: '#F58388' },
    secondary: { main: '#DD767B' },
  },
  custom: {
    white: '#eff0f8',
    black: '#333333',
    lightMain: '#FCA4A7',
    darkSecondary: '#C0676B',
    fontColor: '#333333',
    background: '#FFFFFF',
    backgroundDark: '#e3e3e399',
  },
});

// ## 🔑 Puntos clave
// - darkTheme: colores oscuros con contraste claro.
// - lightTheme: colores claros con contraste oscuro.
// - `custom` asegura consistencia en colores adicionales.
