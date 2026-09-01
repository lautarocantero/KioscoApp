import type {
  DesktopDownloadTarget,
  LandingAccentKey,
  LandingDotGridSide,
  LandingDownloadTrustPoint,
  LandingFeatureShowcaseGridItem,
  LandingFeatureShowcaseItem,
  LandingHeroBenefit,
  LandingNavLink,
  LandingResponsiveHeight,
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

export interface LandingFeatureShowcaseItemsProps {
  items: LandingFeatureShowcaseGridItem[];
  accent: LandingAccentKey;
  onItemClick?: () => void;
}

export interface LandingFeatureShowcaseItemCardProps extends Pick<LandingFeatureShowcaseGridItem, "Icon" | "isClickable"> {
  label: string;
  detail: string;
  accent: LandingAccentKey;
  onClick?: () => void;
}

export interface LandingFeatureShowcaseSavesProps {
  text: string;
}

export interface LandingFeatureShowcaseMediaProps {
  alt: string;
  videoSrc: string;
  accentColor: string;
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
  height?: LandingResponsiveHeight;
}

export interface LandingDownloadTrustRowProps {
  points: LandingDownloadTrustPoint[];
}

export interface LandingHeroBenefitsProps {
  benefits: LandingHeroBenefit[];
}

export interface LandingDotGridDecorationProps {
  side: LandingDotGridSide;
}
