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
    fontColorTransparent: '#eff0f88c',
    backgroundLigth: '#eff0f826',
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
    backgroundLigth: '#FCA4A7',
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
