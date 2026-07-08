import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      //────────────── main ──────────────────//
      lightMain: string;
      darkMain: string;

      //────────────── secondary ──────────────────//
      lightSecondary: string;
      darkSecondary: string;

      //────────────── error ──────────────────//
      errorLight: string;
      errorDark: string;

      //────────────── background ──────────────────//
      lightBackground: string;
      background: string;
      darkBackground: string;

      //────────────── fonts ──────────────────//
      fontColor: string;
      translucidFontColor: string;

      //────────────── white ──────────────────//
      white: string;
      darkWhite: string;
      translucidWhite: string;

      //────────────── gray ──────────────────//
      lightGray: string;
      darkGray: string;

      //────────────── black ──────────────────//
      black: string;
      darkblack: string;
      blackTranslucid: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      //────────────── main ──────────────────//
      lightMain?: string;
      darkMain?: string;

      //────────────── secondary ──────────────────//
      lightSecondary?: string;
      darkSecondary?: string;

      //────────────── error ──────────────────//
      errorLight?: string;
      errorDark?: string;

      //────────────── background ──────────────────//
      lightBackground?: string;
      background?: string;
      darkBackground?: string;

      //────────────── fonts ──────────────────//
      fontColor?: string;
      translucidFontColor?: string;

      //────────────── white ──────────────────//
      white?: string;
      darkWhite?: string;
      translucidWhite?: string;

      //────────────── gray ──────────────────//
      lightGray?: string;
      darkGray?: string;

      //────────────── black ──────────────────//
      black?: string;
      darkblack?: string;
      blackTranslucid?: string;
    };

    unstable_grid?: {
      cssGrid?: boolean;
    };

    unstable_sx?: boolean;
  }
}

export const darkTheme = createTheme({
  unstable_sx: true,
  unstable_grid: { cssGrid: true },
  palette: {
    mode: 'dark',
    primary:   { main: '#A65CFF' },
    secondary: { main: '#8FE34A' },
    error:     { main: '#842325' },
  },
  custom: {
    //────────────── main ──────────────────//
    lightMain: '#ac7aee',  //editar
    darkMain: '#8E49E8',

    //────────────── secondary ──────────────────//
    lightSecondary: '#acf174', //editar
    darkSecondary: '#78C83E',

    //────────────── error ──────────────────//
    errorLight: "#6b100a6c",
    errorDark:  "#310704ff",

    //────────────── background ──────────────────//
    lightBackground: '#272C36',
    background: '#1f2125',
    darkBackground: '#0c0d11',
    
    //────────────── fonts ──────────────────//
    fontColor: '#F5F7FA',
    translucidFontColor: 'rgba(245,247,250,0.4)',

    //────────────── white ──────────────────//
    white: '#F5F7FA',
    darkWhite: '#C9CED8',//letra secundaria
    translucidWhite: 'rgba(245,247,250,0.4)', 

    //────────────── gray ──────────────────//
    lightGray: 'rgba(255,255,255,0.45)', // botones secundarios
    darkGray: 'rgba(255,255,255,0.06)', // bordes
    
    //────────────── black ──────────────────//
    black: '#333333',
    darkblack: '#1f2125',
    blackTranslucid: '#09090966',

  },
  typography: {
    fontFamily: `'Montserrat', sans-serif`,
    htmlFontSize: 16,
    fontSize: 16,
    h1: { fontSize: '3rem',   fontWeight: 700 },
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    h3: { fontSize: '2rem',   fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem',fontWeight: 400 },
    body1:   { fontSize: '1.2rem'   },
    body2:   { fontSize: '0.875rem' },
    caption: { fontSize: '0.75rem'  },
  },
});

export const lightTheme = createTheme({
  unstable_sx: true,
  unstable_grid: { cssGrid: true },
  palette: {
    mode: 'light',
    primary:   { main: '#8B5CF6' },   // violeta principal (más moderno tipo Tailwind)
    secondary: { main: '#22C55E' },   // verde suave de acento
    error:     { main: '#EF4444' },
  },
  custom: {
    //────────────── main (violeta) ──────────────────//
    lightMain: '#C4B5FD',  // violeta claro (cards/icon bg)
    darkMain:  '#8B5CF6',  // principal

    //────────────── secondary (verde) ──────────────────//
    lightSecondary: '#BBF7D0',
    darkSecondary:  '#22C55E',

    //────────────── error ──────────────────//
    errorLight: "#FECACA",
    errorDark:  "#7F1D1D",

    //────────────── background ──────────────────//
    lightBackground: '#F8F7FF', // fondo general (ligeramente violeta)
    background:      '#e2def3', // surface base
    darkBackground:  '#c6bdf1', // cards elevadas suaves

    //────────────── fonts ──────────────────//
    fontColor: '#1F2937', // gris oscuro moderno
    translucidFontColor: 'rgba(31,41,55,0.5)',

    //────────────── white ──────────────────//
    white: '#FFFFFF',
    darkWhite: '#6B7280', // texto secundario
    translucidWhite: 'rgba(245,247,250,0.4)', 

    //────────────── gray ──────────────────//
    lightGray: 'rgba(0,0,0,0.04)', // hover suave
    darkGray:  'rgba(0,0,0,0.08)', // borders

    //────────────── black ──────────────────//
    black: '#111827',
    darkblack: '#030712',
    blackTranslucid: '#00000033',
  },

  typography: {
    fontFamily: `'Montserrat', sans-serif`,
    htmlFontSize: 16,
    fontSize: 16,

    h1: { fontSize: '3rem',   fontWeight: 700 },
    h2: { fontSize: '2.5rem', fontWeight: 600 },
    h3: { fontSize: '2rem',   fontWeight: 500 },
    h4: { fontSize: '1.5rem', fontWeight: 500 },
    h5: { fontSize: '1.25rem',fontWeight: 500 },

    body1:   { fontSize: '1.1rem' },
    body2:   { fontSize: '0.9rem' },
    caption: { fontSize: '0.75rem' },
  },
});