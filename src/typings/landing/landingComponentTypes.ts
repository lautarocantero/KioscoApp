import type {
  DesktopDownloadTarget,
  LandingAccentKey,
  LandingFeatureShowcaseBullet,
  LandingFeatureShowcaseItem,
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
  src: string;
  alt: string;
  videoSrc: string;
}

export interface LandingFeatureShowcaseRowProps {
  item: LandingFeatureShowcaseItem;
  reverse: boolean;
}
