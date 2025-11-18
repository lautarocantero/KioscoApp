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
  title: string;
}

export type OptionLink = {
    icon: React.ReactNode,
    description: string,
    url: string,
    function?: () => void | null,
}

export interface OptionsListInterface {
    links: OptionLink[],
}

export interface LogoutButtonProps {
  appTheme: boolean,
  dispatch: AppDispatch;
}




