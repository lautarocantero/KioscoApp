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
  isActive: boolean;
  onClick: (url: string) => void;
}

export interface SidebarToggleProps {
  isExpanded: boolean;
  toggleSidebar: ()=> void;
}

export type SidebarExpandMoreProps = Pick<SidebarNavItemProps, "isHovered" | "isOpen" | "hasSubGroups">

export type SidebarCollapseProps = Pick<SidebarNavItemProps, 
  "hasSubGroups" | 
  "isOpen" | 
  "hasSubGroups" | 
  "isHovered" | 
  "subGroups" | 
  "isSubLinkActive" | 
  "onNavigate" 
>

export type SidebarUserDataProps = Pick<SidebarToggleProps, "isExpanded">

export type SidebarLinksListProps  = Pick<SidebarToggleProps, "isExpanded"> & {
  navLinks: NavLinkInterface[];
  handleNavClick: (link: NavLinkInterface) => void
  getLinkMeta:  (link: NavLinkInterface) => {
    subGroups: SubGroup[];
    hasSubGroups: boolean;
    isActive: boolean;
    isOpen: boolean;
  };
  isSubLinkActive: (url: string) => boolean;
  navigate: NavigateFunction;
}

