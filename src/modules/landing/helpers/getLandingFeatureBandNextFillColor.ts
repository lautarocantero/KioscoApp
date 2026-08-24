import type { Theme } from "@mui/material";
import type { LandingFeatureShowcaseItem } from "@typings/landing/landingTypes";
import { getLandingFeatureBandBackgroundColor } from "./getLandingFeatureBandBackgroundColor";

// Color al que debe fundirse la onda decorativa al pie de cada band: el de
// la feature siguiente, o el blanco de la sección de Download cuando es la
// última (mismo criterio que usa el hero para fundirse en la primera band).
export const getLandingFeatureBandNextFillColor = (
  theme: Theme,
  items: LandingFeatureShowcaseItem[],
  index: number
): string => {
  const nextItem = items[index + 1];
  if (!nextItem) return theme.palette.common.white;
  return getLandingFeatureBandBackgroundColor(theme, nextItem.accent);
};
