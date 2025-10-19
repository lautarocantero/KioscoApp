import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      white: string;
      black: string;
      blackTranslucid: string;
      lightMain: string;
      darkSecondary: string;
    };
  }
  interface ThemeOptions {
    custom?: {
      white?: string;
      black?: string;
      blackTranslucid?: string;
      lightMain?: string;
      darkSecondary?: string;
    };
    unstable_grid?: {
      cssGrid?: boolean;
    };
    unstable_sx?: boolean;
  }
}

export const mainTheme = createTheme({
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
    black: '#333333',
    blackTranslucid: '#09090966',
    lightMain: '#66A3FB',
    darkSecondary: '#00357E',
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
