import { useContext, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ThemeContext } from "../../../../../theme/ThemeContext";
import type { AppDispatch } from "../../../../../store/user/userSlice";
import { startLogout } from "../../../../../store/auth/thunks";
import { HomePageLinks } from "../../../../../config/HomePageLinks";
import { NAV_SUBGROUPS } from "./NavSubGroups";
import type { NavLink } from "@typings/ui/uiModules";

export const useAppSidebar = () => {
  const { appTheme } = useContext(ThemeContext);
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch<AppDispatch>();

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isHovered, setIsHovered] = useState(false);

  const dark = !appTheme;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => {
    setIsHovered(false);
    setOpenSection(null);
  };

  const toggleSection = (url: string) => {
    if (!isHovered) return;
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

  const navLinks = HomePageLinks as NavLink[];

  const getLinkMeta = (link: NavLink) => ({
    subGroups: NAV_SUBGROUPS[link.url] ?? [],
    hasSubGroups: !!NAV_SUBGROUPS[link.url]?.length,
    isActive: location.pathname.startsWith(link.url) && link.url !== "/",
    isOpen: openSection === link.url,
  });

  const isSubLinkActive = (url: string) => location.pathname === url;

  return {
    dark,
    isHovered,
    navLinks,
    handleMouseEnter,
    handleMouseLeave,
    handleNavClick,
    handleLogout,
    getLinkMeta,
    isSubLinkActive,
    navigate,
  };
};