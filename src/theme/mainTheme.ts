import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
  interface Theme {
    custom: {
      //────────────── white ──────────────────//
      white: string;
      whiteTranslucid: string;

      //────────────── black ──────────────────//
      black: string;
      blackTranslucid: string;

      //────────────── main ──────────────────//
      lightMain: string;

      //────────────── secondary ──────────────────//
      darkSecondary: string;

      //────────────── font ──────────────────//
      fontColor: string;
      fontColorTransparent: string;
      fontColorDark: string;
      fontColorDarkTransparent: string;

      //────────────── background ──────────────────//
      backgroundLigth: string;
      background: string;
      backgroundDark: string;
      cardBackground: string;

      //────────────── POS Modern UI ──────────────────//
      posBackground: string;
      posCard: string;
      posSurface: string;
      posSurfaceHover: string;
      posBorder: string;
      posDivider: string;

      posText: string;
      posTextSecondary: string;
      posPlaceholder: string;
      posIcon: string;

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
      whiteTranslucid?: string;

      //────────────── black ──────────────────//
      black?: string;
      blackTranslucid?: string;

      //────────────── main ──────────────────//
      lightMain?: string;

      //────────────── secondary ──────────────────//
      darkSecondary?: string;

      //────────────── font ──────────────────//
      fontColor?: string;
      fontColorTransparent?: string;
      fontColorDark?: string;
      fontColorDarkTransparent?: string;

      //────────────── background ──────────────────//
      backgroundLigth?: string;
      background?: string;
      backgroundDark?: string;
      cardBackground?: string;

      //────────────── POS Modern UI ──────────────────//
      posBackground?: string;
      posCard?: string;
      posSurface?: string;
      posSurfaceHover?: string;
      posBorder?: string;
      posDivider?: string;

      posText?: string;
      posTextSecondary?: string;
      posPlaceholder?: string;
      posIcon?: string;

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
    primary:   { main: '#0386EE' },
    secondary: { main: '#0058AF' },
    error:     { main: '#842325' },
  },
  custom: {
    //────────────── white ──────────────────//
    white: '#eff0f8',
    whiteTranslucid: '#eff0f865',

    //────────────── black ──────────────────//
    black: '#333333',
    blackTranslucid: '#09090966',

    //────────────── main ──────────────────//
    lightMain: '#66A3FB',

    //────────────── secondary ──────────────────//
    darkSecondary: '#00357E',

    //────────────── font ──────────────────//
    fontColor: '#eff0f8',
    fontColorTransparent: '#eff0f842',
    fontColorDark: '#333333',
    fontColorDarkTransparent: '#09090966',

    //────────────── background ──────────────────//
    backgroundLigth: '#525253ff',
    background: '#333333',
    backgroundDark: '#0c0d11',
    cardBackground: 'rgba(255,255,255,0.07)',

    //────────────── POS Modern UI ──────────────────//
    posBackground: '#11141A',
    posCard: '#1f2125',
    posSurface: '#272C36',
    posSurfaceHover: '#2D3440',
    posBorder: 'rgba(255,255,255,0.06)',
    posDivider: '#343946',

    posText: '#F5F7FA',
    posTextSecondary: '#C9CED8',
    posPlaceholder: 'rgba(255,255,255,0.45)',
    posIcon: '#AEB6C4',

    posAccent: '#A65CFF',
    posAccentHover: '#8E49E8',

    posSuccess: '#8FE34A',
    posSuccessHover: '#78C83E',

    //────────────── accent colors ──────────────────//
    accentSells:      '#0386EE',
    accentShop:       '#1D9E75',
    accentProviders:  '#534AB7',
    accentProducts:   '#1f1f24',
    accentCategories: '#C2580A',
    accentAccount:    '#854F0B',

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
    whiteTranslucid: '#eff0f826',

    //────────────── black ──────────────────//
    black: '#333333',
    blackTranslucid: '#09090966',

    //────────────── main ──────────────────//
    lightMain: '#FCA4A7',

    //────────────── secondary ──────────────────//
    darkSecondary: '#C0676B',

    //────────────── font ──────────────────//
    fontColor: '#333333',
    fontColorTransparent: '#3333333d',
    fontColorDark: '#333333',
    fontColorDarkTransparent: '#09090966',

    //────────────── background ──────────────────//
    backgroundLigth: '#bbbbbbff',
    background: '#FFFFFF',
    backgroundDark: '#fde8d8',
    cardBackground: '#ffffff',

    //────────────── accent colors ──────────────────//
    accentSells:      '#0386EE',
    accentShop:       '#1D9E75',
    accentProviders:  '#534AB7',
    accentProducts:   '#1f1f24',
    accentCategories: '#C2580A',
    accentAccount:    '#854F0B',

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
