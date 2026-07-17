import { useState, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../../store/user/userSlice";
import { startLogout } from "../../../../../../store/auth/thunks";
import { SidebarNavLinks } from "../../../../../../config/Links";
import { NAV_SUBGROUPS } from "../helper/NavSubGroups";
import type { NavLinkInterface } from "@typings/ui/sidebar.types";
import { SIDEBAR_STORAGE_KEY } from "../../../../../../config/constants";


export const useAppSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const navLinks = SidebarNavLinks as NavLinkInterface[];

  const [openSection, setOpenSection] = useState<string | null>(null);
  const [isExpanded, setIsExpanded] = useState<boolean>(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const toggleSidebar = useCallback(() => {
    setIsExpanded((prev) => {
      const next = !prev;
      localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
      return next;
    });
  }, []);


  const toggleSection = (url: string) => {
    if (!isExpanded) return;
    setOpenSection((prev) => (prev === url ? null : url));
  };

  const handleNavClick = useCallback((link: NavLinkInterface) => {
    const hasSubGroups = !!NAV_SUBGROUPS[link.url]?.length;

    if (!hasSubGroups) {
      navigate(link.url);
      return;
    }

    if (!isExpanded) {
      setIsExpanded(true);
      localStorage.setItem(SIDEBAR_STORAGE_KEY, "true");
      setOpenSection(link.url);
      return;
    }

    toggleSection(link.url);
  }, [navigate, toggleSection, isExpanded]);

  const handleLogout = useCallback(() => dispatch(startLogout()), [dispatch]);
 
  const getLinkMeta = useCallback((link: NavLinkInterface) => ({
    subGroups: NAV_SUBGROUPS[link.url] ?? [],
    hasSubGroups: !!NAV_SUBGROUPS[link.url]?.length,
    isActive: location.pathname.startsWith(link.url) && link.url !== "/",
    isOpen: openSection === link.url,
  }), [location.pathname, openSection]);

  const isSubLinkActive = useCallback((url: string) => location.pathname === url, [location.pathname]);

  return {
    isExpanded,
    navLinks,
    toggleSidebar,
    handleNavClick,
    handleLogout,
    getLinkMeta,
    isSubLinkActive,
    navigate,
    isMobileOpen, 
    setIsMobileOpen
  };
};