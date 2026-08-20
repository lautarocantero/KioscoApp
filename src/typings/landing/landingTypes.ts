import type { ComponentType } from "react";
import type { SvgIconProps } from "@mui/material";
import type { OperatingSystemEnum } from "./landingEnums";

export type LandingAccentKey = "violet" | "green" | "blue" | "orange" | "pink" | "gold";

export type LandingNavLink = {
  labelKey: string;
  targetId: string;
};

export type DesktopDownloadTarget = {
  os: OperatingSystemEnum;
  labelKey: string;
  Icon: ComponentType<SvgIconProps>;
  href: string;
};

export type LandingFeatureShowcaseBullet = {
  Icon: ComponentType<SvgIconProps>;
  labelKey: string;
};

export type LandingFeatureShowcaseItem = {
  badgeKey: string;
  titleStartKey: string;
  titleHighlightKey: string;
  titleEndKey: string;
  subtitleKey: string;
  accent: LandingAccentKey;
  mediaSrc: string;
  mediaVideoSrc: string;
  mediaAltKey: string;
  bullets: LandingFeatureShowcaseBullet[];
};
