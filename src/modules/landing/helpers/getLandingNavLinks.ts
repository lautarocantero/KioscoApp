import type { LandingNavLink } from "@typings/landing/landingTypes";

export const getLandingNavLinks = (): LandingNavLink[] => [
  { labelKey: "landing.nav.features", targetId: "landing-features" },
  { labelKey: "landing.nav.resources", targetId: "landing-download" },
];
