import { lazy, Suspense } from "react";
import type { Theme } from "@mui/material";
import { Box } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SidebarLogout from "./components/SidebarLogout";
import { useAppSidebar } from "./hooks/useAppSidebar";
import { useSettingsModal } from "@hooks/ui/useSettingsModal";
import { COLLAPSED_WIDTH, EXPANDED_WIDTH } from "../../../../../config/constants";
import SidebarToggleComponent from "./components/SidebarToggle";
import SidebarLinksList from "./components/SidebarLinksList";
import { getNoisyBackgroundSx } from "../../../../../modules/shared/components/NoisyBackground/NoisyBackground";
import SidebarUserData from "./components/SidebarUserData/SidebarUserData";
import "animate.css";
import SidebarToggleButtonMobile from "./components/SidebarToggleButtonMobile";
import SidebarMobileDrawer from "./components/SidebarMobileDrawer";

// Modal pesado y opcional (no hace falta en el primer render): se carga
// solo cuando el usuario abre Ajustes.
const SettingsModal = lazy(() => import("../../../../../modules/shared/components/SettingsModal/SettingsModal"));

const AppSidebar = (): React.ReactNode => {
  const {
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
  } = useAppSidebar();

  const { isOpen: isSettingsOpen, openSettings, closeSettings } = useSettingsModal();

  return (
    <>
      {/* ── Mobile: botón hamburguesa + drawer ── */}
      <SidebarToggleButtonMobile onOpen={() => setIsMobileOpen(true)} />

      <SidebarMobileDrawer
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        handleNavClick={handleNavClick}
        handleLogout={handleLogout}
        getLinkMeta={getLinkMeta}
        isSubLinkActive={isSubLinkActive}
        navigate={navigate}
        onOpenSettings={openSettings}
      />

      {/* ── Espaciador: reserva el ancho fijo en el flujo, nunca cambia ── */}
      <Box
        sx={{
          width: { xs: 0, sm: COLLAPSED_WIDTH },
          minWidth: { xs: 0, sm: COLLAPSED_WIDTH },
          flexShrink: 0,
          height: "100vh",
        }}
      />

      {/* ── Panel visual desktop: flota por encima, se expande sin empujar nada ── */}
      <Box
        component="nav"
        sx={(theme: Theme) => ({
          width: { xs: 0, sm: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH },
          minWidth: { xs: 0, sm: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH },
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          py: 2.5,
          gap: 1,
          borderRight: theme.custom.darkGray,
          height: "100vh",
          transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
          zIndex: 1200,
          boxShadow: isExpanded ? `4px 0 24px ${alpha(theme.custom.black, 0.25)}` : "none",
          ...getNoisyBackgroundSx({ theme, backgroundColor: theme.palette.primary.main }),
          position: "fixed",
          top: 0,
          left: 0,
          overflow: "hidden",
        })}
      >
        <SidebarToggleComponent isExpanded={isExpanded} toggleSidebar={toggleSidebar} />

        <SidebarLinksList
          isExpanded={isExpanded}
          navLinks={navLinks}
          handleNavClick={handleNavClick}
          getLinkMeta={getLinkMeta}
          isSubLinkActive={isSubLinkActive}
          navigate={navigate}
        />

        <SidebarUserData isExpanded={isExpanded} onOpenSettings={openSettings} />

        <SidebarLogout isHovered={isExpanded} onLogout={handleLogout} />
      </Box>

      {isSettingsOpen && (
        <Suspense fallback={null}>
          <SettingsModal open={isSettingsOpen} onClose={closeSettings} />
        </Suspense>
      )}
    </>
  );
};

export default AppSidebar;