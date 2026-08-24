import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import type { LandingDecorationPosition, OperatingSystemEnum } from "./landingEnums";

export type LandingAccentKey = "violet" | "green" | "blue" | "orange" | "pink" | "gold";

export type LandingNavLink = {
  labelKey: string;
  targetId: string;
};

export type DesktopDownloadTarget = {
  os: OperatingSystemEnum;
  labelKey: string;
  descriptionKey: string;
  Icon: ComponentType<SvgIconProps>;
  illustrationSrc: string;
  href: string;
  isPrimary: boolean;
};

export type LandingFeatureShowcaseBullet = {
  Icon: ComponentType<SvgIconProps>;
  labelKey: string;
};

export type LandingDownloadTrustPoint = {
  Icon: ComponentType<SvgIconProps>;
  titleKey: string;
  subtitleKey: string;
};

export type LandingDotGridSide = "left" | "right";

export type LandingResponsiveHeight = { xs: string; md: string };

export type LandingMediaDecoration = {
  src: string;
  position: LandingDecorationPosition;
};

export type LandingFeatureShowcaseItem = {
  badgeKey: string;
  titleStartKey: string;
  titleHighlightKey: string;
  titleEndKey: string;
  subtitleKey: string;
  accent: LandingAccentKey;
  mediaVideoSrc: string;
  mediaAltKey: string;
  mediaDecorations: LandingMediaDecoration[];
  bullets: LandingFeatureShowcaseBullet[];
};
