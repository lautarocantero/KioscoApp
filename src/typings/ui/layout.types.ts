import type { ReactNode } from "react";


export interface AppLayoutProps {
  isOptions?: boolean;
  fullWidth?: boolean;
  noCenter?: boolean;
  title?: string;
  icon?: ReactNode;
  greetings?: string;

  // ── Search bar ──
  hasSearchBar?: boolean;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;

  // ── New item button ──
  hasNewItem?: boolean;
  newItemLabel?: string;
  onNewItemClick?: () => void;
  newItemHref?: string;
}

export type OptionLink = {
  icon: ReactNode,
  description: string,
  subtitle?: string,
  url: string,
  function?: (() => void) | null,
  value?: string;
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
