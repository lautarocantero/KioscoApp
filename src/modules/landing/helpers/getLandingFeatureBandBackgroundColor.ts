import type { Theme } from "@mui/material";
import type { LandingAccentKey } from "@typings/landing/landingTypes";
import { getLandingAccentColor } from "./getLandingAccentColor";

// Base oscura común a todas las bands de features (pedido puntual del
// landing, no forma parte del theme global). Cada band se tiñe con su
// propio color de acento para que la sección completa (no solo una card)
// quede identificada con ese color, sin perder legibilidad del texto claro.
const LANDING_FEATURE_BAND_BASE_COLOR = "#1f1c2c";
const LANDING_FEATURE_BAND_ACCENT_TINT_PERCENTAGE = 18;

export const getLandingFeatureBandBackgroundColor = (theme: Theme, accent: LandingAccentKey): string => {
  const accentColor = getLandingAccentColor(theme, accent);
  return `color-mix(in srgb, ${accentColor} ${LANDING_FEATURE_BAND_ACCENT_TINT_PERCENTAGE}%, ${LANDING_FEATURE_BAND_BASE_COLOR} ${100 - LANDING_FEATURE_BAND_ACCENT_TINT_PERCENTAGE}%)`;
};
