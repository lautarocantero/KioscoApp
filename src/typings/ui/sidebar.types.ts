import type { ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";
import type { OptionLink } from "@typings/ui/layout.types";
import type { KioscoWithStats } from "@typings/kiosco/kioscoTypes";
import type { UserData } from "@typings/account/accountComponentTypes";

// ─── riel (siempre visible, nunca se colapsa) ─────────────────────────────

export interface SidebarSellButtonProps {
  isActive: boolean;
  onClick: () => void;
  variant?: "rail" | "fab";
}

export interface SidebarRailItemProps {
  link: OptionLink;
  isActive: boolean;
  onClick: (link: OptionLink) => void;
}

export interface SidebarKioscoSwitcherProps {
  name: string;
  initials: string;
  isActive: boolean;
  onClick: () => void;
}

// ─── panel flotante de sección ────────────────────────────────────────────

/** Destino de navegación dentro de la sección activa (ex sub-link). */
export interface SubLink {
  label: string;
  url: string;
  count?: string | number;
}

export type NavDestinationsMap = Record<string, SubLink[]>;

export interface SidebarSectionHeaderProps {
  link: OptionLink;
}

export interface SidebarSectionActionProps {
  action: NonNullable<OptionLink["action"]>;
  onNavigate: (url: string) => void;
}

export interface SidebarSectionLinksProps {
  destinations: SubLink[];
  isSubLinkActive: (url: string) => boolean;
  onNavigate: (url: string) => void;
}

export interface SidebarPanelToggleProps {
  onClick: () => void;
}

export interface SidebarUserMenuProps {
  userData: UserData;
  onOpenSettings: () => void;
  onLogout: () => void;
}

export interface UseSidebarLogoutConfirmReturn {
  isOpen: boolean;
  requestLogout: () => void;
  cancelLogout: () => void;
  confirmLogout: () => void;
}

export interface SidebarPanelProps {
  isOpen: boolean;
  activeLink?: OptionLink;
  destinations: SubLink[];
  isSubLinkActive: (url: string) => boolean;
  onNavigate: (url: string) => void;
  onOpenSettings: () => void;
  onLogout: () => void;
  onClosePanel: () => void;
}

// ─── tienda activa / selector de kioscos ──────────────────────────────────

export interface UseSidebarKioscoCardReturn {
  activeKiosco: KioscoWithStats | null;
  kioscos: KioscoWithStats[];
  loading: boolean;
  error: string | null;
  entering: string | null;
  isListOpen: boolean;
  toggleList: () => void;
  handleSelect: (kiosco: KioscoWithStats) => void;
}

// ─── listado de navegación (base compartida por desktop y mobile) ────────

export interface SidebarNavigationBaseProps {
  navLinks: OptionLink[];
  isLinkActive: (link: OptionLink) => boolean;
  handleNavClick: (link: OptionLink) => void;
  isSubLinkActive: (url: string) => boolean;
  navigate: NavigateFunction;
}

export interface SidebarMobileDrawerProps extends SidebarNavigationBaseProps {
  open: boolean;
  onClose: () => void;
  handleLogout: () => void;
  onOpenSettings: () => void;
  onSellClick: () => void;
  isSellActive: boolean;
}

export interface SidebarToggleButtonMobileProps {
  onOpen: () => void;
}

export interface SidebarMobileNavRowProps {
  icon: ReactNode;
  label: string;
  isActive: boolean;
  onClick: () => void;
}
