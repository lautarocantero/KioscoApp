import type { ReactNode, SetStateAction, Dispatch } from "react";

//────────────────────────────────────────── 🔖Layout ─────────────────────────────────────────//

export interface AppLayoutProps {
  isOptions?: boolean;
  fullWidth?: boolean;
  noCenter?: boolean;
  noPadding?: boolean;
  title?: string;
  icon?: ReactNode;
  greetings?: string;
}

//────────────────────────────────────────── LightMode ─────────────────────────────────────────//

export interface ThemeContextType {
  appTheme: boolean;
  setAppTheme: Dispatch<SetStateAction<boolean>>;
}

//────────────────────────────────────────── FontSize ─────────────────────────────────────────//

export interface FontSizeContextType {
  fontSize: number;
  setFontSize: (fontSize: number) => void;
}

//────────────────────────────────────────── 🔖 OptionsCards 🔖 ─────────────────────────────────────────//

export interface LinkDataResult {
  value?: string | number | null;
  secondaryValue?: string | null;
  isLoading?: boolean;
  error?: string | null;
  subtitle?: string | number | null;
}

export interface OptionLink {
  description: string;
  icon: React.ReactNode;
  url: string;
  value?: string;
  secondaryValue?: string | null;
  isLoading?: boolean;
  subtitle?: string;
  useData?: () => LinkDataResult;
  formatValue?: (value: string | number | null | undefined) => string;
  disabled?: boolean; 
}

export type LinkCardArrowProps = object;


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
