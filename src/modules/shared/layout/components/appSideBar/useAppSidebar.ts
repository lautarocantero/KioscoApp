import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../../../../theme/ThemeContext";
import type { AppDispatch } from "../../../../../store/user/userSlice";
import { startLogout } from "../../../../../store/auth/thunks";
import { SidebarNavLinks } from "../../../../../config/Links";
import { NAV_SUBGROUPS } from "./NavSubGroups";
import type { NavLink } from "@typings/ui/uiModules";

const SIDEBAR_STORAGE_KEY = "sidebar-expanded";

export const useAppSidebar = () => {
  const { appTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored === "true";
  });

  const toggleSidebar = () => {
    setIsExpanded((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  };
  const dark = !appTheme;


  const toggleSection = (url: string) => {
    if (!isExpanded) return;
    setOpenSection((prev) => (prev === url ? null : url));
  };

  const handleNavClick = (link: NavLink) => {
    const hasSubGroups = !!NAV_SUBGROUPS[link.url]?.length;
    if (hasSubGroups) {
      toggleSection(link.url);
    } else {
      navigate(link.url);
    }
  };

  const handleLogout = () => dispatch(startLogout());

  const navLinks = SidebarNavLinks as NavLink[];

  const getLinkMeta = (link: NavLink) => ({
    subGroups: NAV_SUBGROUPS[link.url] ?? [],
    hasSubGroups: !!NAV_SUBGROUPS[link.url]?.length,
    isActive: location.pathname.startsWith(link.url) && link.url !== "/",
    isOpen: openSection === link.url,
  });

  const isSubLinkActive = (url: string) => location.pathname === url;

  return {
    dark,
    isExpanded,
    navLinks,
    toggleSidebar,
    handleNavClick,
    handleLogout,
    getLinkMeta,
    isSubLinkActive,
    navigate,
  };
};