import type { ReactNode } from "react";


export interface SidebarThemeProps {
  dark: boolean;
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

export interface SidebarLogoutProps extends SidebarThemeProps {
  onLogout: () => void;
}

export interface SidebarNavItemProps extends SidebarThemeProps {
  link: NavLinkInterface;
  isActive: boolean;
  isOpen: boolean;
  hasSubGroups: boolean;
  subGroups: SubGroup[];
  onRowClick: (link: NavLinkInterface) => void;
  isSubLinkActive: (url: string) => boolean;
  onNavigate: (url: string) => void;
}

export interface SidebarSubGroupProps extends SidebarThemeProps {
  group: SubGroup;
  isSubLinkActive: (url: string) => boolean;
  onNavigate: (url: string) => void;
}

export interface SidebarSubLinkProps {
  subLink: SubLink;
  dark: boolean;
  isActive: boolean;
  onClick: (url: string) => void;
}
