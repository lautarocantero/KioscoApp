import type { ReactNode } from "react";
import type { NavigateFunction } from "react-router-dom";


export interface SidebarThemeProps {
  isHovered: boolean;
}

export interface SubLink {
  label: string;
  url: string;
}

export interface SubGroup {
  groupLabel: string;
  links: SubLink[];
}

export interface NavLinkInterface {
  url: string;
  description: string;
  icon: ReactNode;
  subGroups?: SubGroup[];
}

// ─── shapes reutilizables ─────────────────────────────────────────────────

/** Metadata derivada de un NavLinkInterface (retorno de getLinkMeta). */
export interface LinkMeta {
  subGroups: SubGroup[];
  hasSubGroups: boolean;
  isActive: boolean;
  isOpen: boolean;
}

/** Handlers de navegación por url, compartidos entre item y subgrupo. */
export interface SidebarNavigationHandlers {
  isSubLinkActive: (url: string) => boolean;
  onNavigate: (url: string) => void;
}

export type NavLinkClickHandler = (link: NavLinkInterface) => void;

// ─── logout / toggle ──────────────────────────────────────────────────────

export interface SidebarLogoutProps extends SidebarThemeProps {
  onLogout: () => void;
}

export interface SidebarToggleProps {
  isExpanded: boolean;
  toggleSidebar: () => void;
}

export type SidebarUserDataProps = Pick<SidebarToggleProps, "isExpanded">;

// ─── nav item / subgroup / sublink ────────────────────────────────────────

export interface SidebarNavItemProps extends SidebarThemeProps, LinkMeta, SidebarNavigationHandlers {
  link: NavLinkInterface;
  onRowClick: NavLinkClickHandler;
}

export interface SidebarSubGroupProps extends SidebarThemeProps, SidebarNavigationHandlers {
  group: SubGroup;
}

export interface SidebarSubLinkProps {
  subLink: SubLink;
  isActive: boolean;
  onClick: (url: string) => void;
}

export type SidebarExpandMoreProps = Pick<SidebarNavItemProps, "isHovered" | "isOpen" | "hasSubGroups">;

export type SidebarCollapseProps = Pick<SidebarNavItemProps,"hasSubGroups" | "isOpen" | "isHovered" | "subGroups" | "isSubLinkActive" | "onNavigate">;

// ─── listado de navegación (base compartida por desktop y mobile) ────────

export interface SidebarNavigationBaseProps {
  navLinks: NavLinkInterface[];
  handleNavClick: NavLinkClickHandler;
  getLinkMeta: (link: NavLinkInterface) => LinkMeta;
  isSubLinkActive: (url: string) => boolean;
  navigate: NavigateFunction;
}

export type SidebarLinksListProps = Pick<SidebarToggleProps, "isExpanded"> & SidebarNavigationBaseProps;

export interface SidebarMobileDrawerProps extends SidebarNavigationBaseProps {
  open: boolean;
  onClose: () => void;
  handleLogout: () => void;
}

export interface SidebarToggleButtonMobileProps {
  onOpen: () => void;
}