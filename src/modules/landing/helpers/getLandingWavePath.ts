// Formas de onda distintas para que las transiciones entre secciones no se
// repitan siempre igual — cada LandingWaveDivider elige una según su índice.
const LANDING_WAVE_PATHS: readonly string[] = [
  "M0,90 C480,150 960,-40 1440,30 L1440,120 L0,120 Z",
  "M0,30 C480,-40 960,150 1440,90 L1440,120 L0,120 Z",
  "M0,60 C240,110 480,10 720,60 C960,110 1200,10 1440,60 L1440,120 L0,120 Z",
  "M0,50 C360,-20 1080,140 1440,70 L1440,120 L0,120 Z",
];

export const getLandingWavePath = (variant: number): string => {
  const index = ((variant % LANDING_WAVE_PATHS.length) + LANDING_WAVE_PATHS.length) % LANDING_WAVE_PATHS.length;
  return LANDING_WAVE_PATHS[index];
};
