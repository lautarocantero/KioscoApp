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

      //────────────── accents (metadata / íconos categóricos) ──────────────────//
      accents: {
        violet: string;
        pink: string;
        green: string;
        blue: string;
        orange: string;
        gold: string;
      };

      //────────────── admin badge (gradiente + sombras) ──────────────────//
      adminBadge: {
        gradientStart: string;
        gradientMid: string;
        gradientEnd: string;
        textColor: string;
        shadowRing: string;
        shadowGlow: string;
      };
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

      //────────────── accents (metadata / íconos categóricos) ──────────────────//
      accents?: {
        violet?: string;
        pink?: string;
        green?: string;
        blue?: string;
        orange?: string;
        gold?: string;
      };

      //────────────── admin badge (gradiente + sombras) ──────────────────//
      adminBadge?: {
        gradientStart?: string;
        gradientMid?: string;
        gradientEnd?: string;
        textColor?: string;
        shadowRing?: string;
        shadowGlow?: string;
      };
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

    //────────────── accents (metadata / íconos categóricos) ──────────────────//
    accents: {
      violet: '#A78BFA', // sku
      pink:   '#F472B6', // model_type
      green:  '#4ADE80', // model_size
      blue:   '#60A5FA', // libre para futuros campos
      orange: '#FB923C', // libre para futuros campos
      gold:   '#F5A623', // roles / badges destacados
    },

    //────────────── admin badge (gradiente + sombras) ──────────────────//
    adminBadge: {
      gradientStart: '#FFD874',
      gradientMid:   '#F5A623',
      gradientEnd:   '#E8890C',
      textColor:     '#3A2205',
      shadowRing:    'rgba(255, 216, 116, 0.35)',
      shadowGlow:    'rgba(232, 137, 12, 0.45)',
    },

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

    //────────────── accents (metadata / íconos categóricos) ──────────────────//
    accents: {
      violet: '#8B5CF6', // sku
      pink:   '#EC4899', // model_type
      green:  '#22C55E', // model_size
      blue:   '#3B82F6', // libre para futuros campos
      orange: '#F97316', // libre para futuros campos
      gold:   '#E8890C', // roles / badges destacados
    },

    //────────────── admin badge (gradiente + sombras) ──────────────────//
    adminBadge: {
      gradientStart: '#FFD874',
      gradientMid:   '#F5A623',
      gradientEnd:   '#E8890C',
      textColor:     '#3A2205',
      shadowRing:    'rgba(255, 216, 116, 0.35)',
      shadowGlow:    'rgba(232, 137, 12, 0.45)',
    },

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