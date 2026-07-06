import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      //────────────── white ──────────────────//
      white: string;
      translucidWhite: string;

      //────────────── black ──────────────────//
      black: string;
      blackTranslucid: string;

      //────────────── main ──────────────────//
      lightMain: string;
      darkMain?: string;

      //────────────── secondary ──────────────────//
      lightSecondary?: string;
      darkSecondary: string;

      //────────────── font ──────────────────//
      fontColor: string;
      translucidFontColor: string;
      fontColorDark: string;
      fontColorDarkTransparent: string;

      //────────────── background ──────────────────//
      background: string;
      backgroundDark: string;

      //────────────── POS Modern UI ──────────────────//
      posBackground: string;
      posCard: string;
      posSurface: string;
      darkGray: string;

      posText: string;
      darkWhite: string;
      lightGray: string;

      posAccent: string;
      posAccentHover: string;

      posSuccess: string;
      posSuccessHover: string;

      //────────────── accent colors ──────────────────//
      accentSells: string;
      accentShop: string;
      accentProviders: string;
      accentProducts: string;
      accentCategories: string;
      accentAccount: string;

      //────────────── error ──────────────────//
      errorLight: string;
      errorDark: string;
    };
  }

  interface ThemeOptions {
    custom?: {
      //────────────── white ──────────────────//
      white?: string;
      translucidWhite?: string;

      //────────────── black ──────────────────//
      black?: string;
      blackTranslucid?: string;

      //────────────── main ──────────────────//
      lightMain?: string;
      darkMain?: string;

      //────────────── secondary ──────────────────//
      lightSecondary?: string;
      darkSecondary?: string;

      //────────────── font ──────────────────//
      fontColor?: string;
      translucidFontColor?: string;
      fontColorDark?: string;
      fontColorDarkTransparent?: string;

      //────────────── background ──────────────────//
      background?: string;
      backgroundDark?: string;

      //────────────── POS Modern UI ──────────────────//
      posBackground?: string;
      posCard?: string;
      posSurface?: string;
      darkGray?: string;

      posText?: string;
      darkWhite?: string;
      lightGray?: string;

      posAccent?: string;
      posAccentHover?: string;

      posSuccess?: string;
      posSuccessHover?: string;

      //────────────── accent colors ──────────────────//
      accentSells?: string;
      accentShop?: string;
      accentProviders?: string;
      accentProducts?: string;
      accentCategories?: string;
      accentAccount?: string;

      //────────────── error ──────────────────//
      errorLight?: string;
      errorDark?: string;
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
    black: '#333333', // 14

    posCard: '#1f2125', // 1
    fontColorDarkTransparent: '#09090966', // 5
    posBackground: '#11141A', // 9
    backgroundDark: '#0c0d11', // 10
    blackTranslucid: '#09090966', // 11
    posSurface: '#272C36', // 11
    fontColorDark: '#333333', // 22
    background: '#333333', // 129
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
    primary:   { main: '#F58388' },
    secondary: { main: '#DD767B' },
    error:     { main: '#842325' },
  },
  custom: {
    //────────────── white ──────────────────//
    white: '#eff0f8',
    translucidWhite: '#eff0f826',

    //────────────── black ──────────────────//
    black: '#333333',
    blackTranslucid: '#09090966',

    //────────────── main ──────────────────//
    lightMain: '#FCA4A7',

    //────────────── secondary ──────────────────//
    darkSecondary: '#C0676B',

    //────────────── font ──────────────────//
    fontColor: '#333333',
    translucidFontColor: '#3333333d',
    fontColorDark: '#333333',
    fontColorDarkTransparent: '#09090966',

    //────────────── background ──────────────────//
    background: '#FFFFFF',
    backgroundDark: '#fde8d8',

    //────────────── error ──────────────────//
    errorLight: "#6b100a6c",
    errorDark:  "#310704ff",
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
