import type { Breakpoint } from "@mui/system";
import type { UnderlineVariant } from "./ui";

/*══════════════════════════════════════════════════════════════════════╗
║ ██ APPBAR   ██████████████████ █████████ █████████ █████████          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}

export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ APP Layout   ██████████████████ █████████ █████████ █████████      ║
╚══════════════════════════════════════════════════════════════════════╝*/

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

export interface DisplayOptionsInterface extends AppLayoutProps {
  links: OptionLink[],
  disconnect?: boolean | undefined,
}

export type OptionsListInterface = Pick<DisplayOptionsInterface, 'links' | 'disconnect'>

export interface OptionsHeaderInterface {
  isOptions?: boolean;
  title?: string,
  icon?: React.ReactNode,
  appTheme: boolean,
}

/*══════════════════════════════════════════════════════════════════════╗
║ ██ BUTTONS   🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨🟦 🟩 🟥 🟨   ║
╚══════════════════════════════════════════════════════════════════════╝*/


export interface PrimaryButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string | { xs?: string; sm?: string; md?: string; lg?: string };
  buttonType?: "button" | "reset" | "submit";
  buttonColor?: "default" | "error";
  dataTestId?: "default" | string;
  padding?: number;
}

export interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string;
}

export interface BackButtonProps {
  appTheme: boolean,
}

export interface LogoutButtonProps extends BackButtonProps {
  dispatch: AppDispatch;
}

// /*══════════════════════════════════════════════════════════════════════╗
// ║ 🪧 Dialog 🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧🪧  
// ╚══════════════════════════════════════════════════════════════════════╝*/

export interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}


