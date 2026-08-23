import type {
  DesktopDownloadTarget,
  LandingAccentKey,
  LandingDotGridSide,
  LandingDownloadTrustPoint,
  LandingFeatureShowcaseBullet,
  LandingFeatureShowcaseItem,
  LandingMediaDecoration,
  LandingNavLink,
} from "./landingTypes";

export interface LandingNavLinksProps {
  links: LandingNavLink[];
  onLinkClick: (targetId: string) => void;
}

export interface LandingDownloadOsCardProps {
  target: DesktopDownloadTarget;
}

export interface LandingFeatureShowcaseBadgeProps {
  label: string;
  accent: LandingAccentKey;
}

export interface LandingFeatureShowcaseBulletsProps {
  bullets: LandingFeatureShowcaseBullet[];
  accent: LandingAccentKey;
}

export interface LandingFeatureShowcaseMediaProps {
  alt: string;
  videoSrc: string;
  accentColor: string;
  decorations?: LandingMediaDecoration[];
}

export interface LandingMediaDecorationImageProps {
  decoration: LandingMediaDecoration;
}

export interface LandingFeatureShowcaseRowProps {
  item: LandingFeatureShowcaseItem;
  reverse: boolean;
}

export interface LandingFeatureShowcaseBandProps extends LandingFeatureShowcaseRowProps {
  nextFillColor: string;
  waveVariant: number;
}

export interface LandingWaveDividerProps {
  fillColor: string;
  variant?: number;
}

export interface LandingDownloadTrustRowProps {
  points: LandingDownloadTrustPoint[];
}

export interface LandingDotGridDecorationProps {
  side: LandingDotGridSide;
}
