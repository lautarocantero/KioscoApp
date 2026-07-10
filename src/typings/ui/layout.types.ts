import type { ReactNode } from "react";

//────────────────────────────────────────── 🔖Layout ─────────────────────────────────────────//

export interface AppLayoutProps {
  isOptions?: boolean;
  fullWidth?: boolean;
  noCenter?: boolean;
  title?: string;
  icon?: ReactNode;
  greetings?: string;
}

//────────────────────────────────────────── 🔖 OptionsCards 🔖 ─────────────────────────────────────────//

export interface LinkDataResult {
  value?: string | number | null;
  loading?: boolean;
  error?: string | null;
  subtitle?: string | number | null;
}

export interface OptionLink {
  description: string;
  icon: React.ReactNode;
  url: string;
  value?: string;
  loading?: boolean;
  subtitle?: string;
  useData?: () => LinkDataResult;
  formatValue?: (value: string | number | null | undefined) => string;
}

export interface DisplayOptionsInterface extends AppLayoutProps {
  links: OptionLink[],
  disconnect?: boolean,
}

export type OptionsListInterface = Pick<DisplayOptionsInterface, 'links' | 'disconnect'>

export interface LinksColumnProps {
  links: OptionLink[];
}

export type LinkMapperProps = Pick<LinksColumnProps, 'links'>;

export interface LinkCardProps {
    link: OptionLink;
};

export type LinkCardIconProps = Pick<OptionLink, 'icon'>; 

export type LinkCardContentProps = Pick<LinkCardProps, 'link'>; 

export interface OptionsHeaderInterface
  extends Pick<AppLayoutProps, 'isOptions' | 'title' | 'icon'> {
    greetings?: string,
}
