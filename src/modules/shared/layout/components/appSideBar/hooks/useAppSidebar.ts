import { useCallback, useMemo, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../../../store/user/userSlice";
import { startLogout } from "../../../../../../store/auth/authThunks";
import type { OptionLink } from "@typings/ui/layout.types";
import { NAV_DESTINATIONS } from "../helper/NavDestinations";
import { SIDEBAR_STORAGE_KEY } from "../../../../../../config/constants";
import { useSidebarNavLinks } from "./useSidebarNavLinks";
import { useSidebarShortcut } from "./useSidebarShortcut";

const SELL_URL = "/new-sell";

const isLinkActive = (link: OptionLink, pathname: string): boolean =>
  link.url !== "/" && pathname.startsWith(link.url);

export const useAppSidebar = () => {

  const navigate = useNavigate();
  const location = useLocation();

  const dispatch = useDispatch<AppDispatch>();

  const navLinks = useSidebarNavLinks();

  const [isPanelOpen, setIsPanelOpen] = useState<boolean>(() => {
    const stored = localStorage.getItem(SIDEBAR_STORAGE_KEY);
    return stored === "true";
  });
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const setPanelOpen = useCallback((next: boolean) => {
    setIsPanelOpen(next);
    localStorage.setItem(SIDEBAR_STORAGE_KEY, String(next));
  }, []);

  const togglePanel = useCallback(() => {
    setPanelOpen(!isPanelOpen);
  }, [isPanelOpen, setPanelOpen]);

  const closePanel = useCallback(() => setPanelOpen(false), [setPanelOpen]);

  // Vender es el único punto de entrada al catálogo: atajo global "V"
  // (ignorado si el foco está en un input), visible desde cualquier sección.
  const handleSellClick = useCallback(() => navigate(SELL_URL), [navigate]);
  useSidebarShortcut(handleSellClick);

  // La sección activa se deriva de location.pathname — ya no hay acordeón
  // que abrir/cerrar, así que navegar y abrir el panel son dos pasos
  // independientes: el click siempre navega, y solo abre el panel si
  // estaba cerrado (si ya está abierto, se queda abierto mostrando la
  // nueva sección).
  const handleNavClick = useCallback((link: OptionLink) => {
    navigate(link.url);
    if (!isPanelOpen) setPanelOpen(true);
  }, [navigate, isPanelOpen, setPanelOpen]);

  // navigate("/") explícito: sin esto, el logout solo limpiaba el estado y
  // dejaba al usuario en la URL protegida en la que estaba, a merced de que
  // el re-render de AppRouter lo mandara a algún lado por su cuenta.
  const handleLogout = useCallback(async () => {
    await dispatch(startLogout());
    navigate("/");
  }, [dispatch, navigate]);

  const activeLink = useMemo(
    () => navLinks.find((link) => isLinkActive(link, location.pathname)),
    [navLinks, location.pathname]
  );

  const destinations = useMemo(
    () => NAV_DESTINATIONS[activeLink?.url ?? ""] ?? [],
    [activeLink]
  );

  const isSellActive = location.pathname.startsWith(SELL_URL);

  const isSubLinkActive = useCallback((url: string) => location.pathname === url, [location.pathname]);

  const isLinkActiveFn = useCallback((link: OptionLink) => isLinkActive(link, location.pathname), [location.pathname]);

  return {
    isPanelOpen,
    togglePanel,
    closePanel,
    navLinks,
    activeLink,
    destinations,
    isLinkActive: isLinkActiveFn,
    isSellActive,
    handleSellClick,
    handleNavClick,
    handleLogout,
    isSubLinkActive,
    navigate,
    isMobileOpen,
    setIsMobileOpen,
  };
};
