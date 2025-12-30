import type { Breakpoint } from "@mui/system";
import type { AlertColor, UnderlineVariant } from "./ui";

//─────────────────────────────── APPBAR 🧱 ───────────────────────────────//

export interface SharedAppBarInterface {
  showFilters: boolean,
}

export type SharedAppBarContentType = Pick<SharedAppBarInterface, 'showFilters'>

export interface LinkInterface {
  label: string;
  to: string;
  underline: Partial<Record<Breakpoint, UnderlineVariant>>;
}

export interface LinksComponentInterface {
  linksToShow: LinkInterface[];
}

//─────────────────────────────── APP Layout 🧩 ───────────────────────────────//

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

export interface LinksColumnProps {
  links: OptionLink[];
  appTheme: boolean;
}

export interface OptionsHeaderInterface {
  isOptions?: boolean;
  title?: string,
  icon?: React.ReactNode,
  appTheme: boolean,
}

//─────────────────────────────── BUTTONS 🟦🟩🟥🟨 ───────────────────────────────//

export interface PrimaryButtonComponentProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string | { xs?: string; sm?: string; md?: string; lg?: string };
  buttonType?: "button" | "reset" | "submit";
  buttonColor?: "default" | "error";
  dataTestId?: "default" | string;
  padding?: number;
  marginTop?: string,
  icon?: React.ReactNode,
}

export interface EmptyButtonProps {
  buttonText: string;
  buttonOnClick: () => void;
  buttonWidth?: string | { xs?: string; sm?: string; md?: string; lg?: string };
}

export interface BackButtonProps {
  appTheme: boolean,
}

export interface LogoutButtonProps extends BackButtonProps {
  dispatch: AppDispatch;
}

//─────────────────────────────── 🪧 Dialog 🪧 ───────────────────────────────//

export interface DialogContextType {
    showModal: boolean;
    setShowModal: Dispatch<SetStateAction<boolean>>;
}

//─────────────────────────────── ⬛ Simple Grid ⬛ ───────────────────────────────//

export interface SimpleGridInterface {
  title?: string,
  position?: string | undefined,
  children: PropsWithChildren,
}

//─────────────────────────────── 🍫 Snack Bar 🍫 ───────────────────────────────//

export interface SnackBarState {
  open: boolean;
  message: string;
  autoHideDuration?: number;
  color: AlertColor;
}

export interface SnackBarContextInterface { 
  snackBar: SnackBarState;
  showSnackBar: (message: string, color: AlertColor) => void;
  closeSnackBar: () => void;
}