import type { Theme } from "@mui/material";
import type { LandingAccentKey } from "@typings/landing/landingTypes";

export const getLandingAccentColor = (theme: Theme, accent: LandingAccentKey): string => {
  return theme.custom.accents[accent];
};
