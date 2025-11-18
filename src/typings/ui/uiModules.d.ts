import type { Breakpoint } from "@mui/system";
import type { UnderlineVariant } from "./ui";

export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}


export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}

export interface AppLayoutProps {
  isOptions?: boolean;
  title?: string;
  icon?: React.ReactNode,
}


export type OptionLink = {
    icon: React.ReactNode,
    description: string,
    url: string,
    function?: () => void | null,
}

export interface OptionsListInterface {
    links: OptionLink[],
    disconnect?: boolean,
}

export interface DisplayOptionsInterface extends AppLayoutProps {
  links: OptionLink[],
  disconnect?: boolean | undefined,
}

export interface BackButtonProps {
  appTheme: boolean,
}

export interface LogoutButtonProps extends BackButtonProps {
  dispatch: AppDispatch;
}




