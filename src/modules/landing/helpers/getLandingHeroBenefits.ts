import type { LandingHeroBenefit } from "@typings/landing/landingTypes";

export const getLandingHeroBenefits = (): LandingHeroBenefit[] => [
  { labelKey: "landing.hero.benefits.sell" },
  { labelKey: "landing.hero.benefits.stock" },
  { labelKey: "landing.hero.benefits.restock" },
  { labelKey: "landing.hero.benefits.cashClose" },
];
