import { lazy, Suspense } from "react";
import type { Theme } from "@mui/material";
import { Box } from "@mui/material";
import SidebarUserAvatar from "./components/SidebarUserAvatar";
import { useAppSidebar } from "./hooks/useAppSidebar";
import { useSettingsModal } from "@hooks/ui/useSettingsModal";
import { useActiveKiosco } from "../../../../../hooks/kiosco/useActiveKiosco";
import { SIDEBAR_RAIL_WIDTH } from "../../../../../config/constants";
import { getNoisyBackgroundSx } from "../../../components/NoisyBackground/NoisyBackground";
import { getInitials } from "../../../helpers/getInitials";
import SidebarSellButton from "./components/SidebarSellButton";
import SidebarRailItem from "./components/SidebarRailItem";
import SidebarKioscoSwitcher from "./components/SidebarKioscoSwitcher";
import SidebarPanel from "./components/SidebarPanel";
import "animate.css";
import SidebarToggleButtonMobile from "./components/SidebarToggleButtonMobile";
import SidebarMobileDrawer from "./components/SidebarMobileDrawer";

// Modal pesado y opcional (no hace falta en el primer render): se carga
// solo cuando el usuario abre Ajustes.
const SettingsModal = lazy(() => import("../../../components/SettingsModal/SettingsModal"));

const AppSidebar = (): React.ReactNode => {
  const {
    isPanelOpen,
    togglePanel,
    closePanel,
    navLinks,
    activeLink,
    destinations,
    isLinkActive,
    isSellActive,
    handleSellClick,
    handleNavClick,
    handleLogout,
    isSubLinkActive,
    navigate,
    isMobileOpen,
    setIsMobileOpen,
  } = useAppSidebar();

  const { activeKiosco } = useActiveKiosco();
  const { isOpen: isSettingsOpen, openSettings, closeSettings } = useSettingsModal();

  return (
    <>
      {/* ── Mobile: botón hamburguesa + drawer, Vender como FAB ── */}
      <SidebarToggleButtonMobile onOpen={() => setIsMobileOpen(true)} />

      <Box sx={{ display: { xs: "block", sm: "none" } }}>
        <SidebarSellButton variant="fab" isActive={isSellActive} onClick={handleSellClick} />
      </Box>

      <SidebarMobileDrawer
        open={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        isLinkActive={isLinkActive}
        handleNavClick={(link) => {
          handleNavClick(link);
          setIsMobileOpen(false);
        }}
        isSubLinkActive={isSubLinkActive}
        navigate={navigate}
        handleLogout={handleLogout}
        onOpenSettings={openSettings}
        onSellClick={() => {
          handleSellClick();
          setIsMobileOpen(false);
        }}
        isSellActive={isSellActive}
      />

      {/* ── Espaciador: reserva el ancho fijo del riel, nunca cambia ── */}
      <Box
        sx={{
          width: { xs: 0, sm: SIDEBAR_RAIL_WIDTH },
          minWidth: { xs: 0, sm: SIDEBAR_RAIL_WIDTH },
          flexShrink: 0,
          height: "100vh",
        }}
      />

      {/* ── Riel: fijo, nunca se colapsa ── */}
      <Box
        component="nav"
        aria-label="Navegación principal"
        sx={(theme: Theme) => ({
          width: { xs: 0, sm: SIDEBAR_RAIL_WIDTH },
          minWidth: { xs: 0, sm: SIDEBAR_RAIL_WIDTH },
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "center",
          py: 2,
          gap: "4px",
          height: "100vh",
          zIndex: 1200,
          ...getNoisyBackgroundSx({ theme, backgroundColor: theme.palette.primary.main }),
          position: "fixed",
          top: 0,
          left: 0,
        })}
      >
        <SidebarSellButton isActive={isSellActive} onClick={handleSellClick} />

        <Box component="ul" sx={{ listStyle: "none", m: 0, p: 0, display: "flex", flexDirection: "column", gap: "4px", width: "100%", alignItems: "center" }}>
          {navLinks.map((link) => (
            <Box component="li" key={link.url}>
              <SidebarRailItem link={link} isActive={isLinkActive(link)} onClick={handleNavClick} />
            </Box>
          ))}
        </Box>

        <Box sx={{ flex: 1 }} />

        {activeKiosco && (
          <SidebarKioscoSwitcher
            name={activeKiosco.name}
            initials={getInitials(activeKiosco.name)}
            isActive={isPanelOpen}
            onClick={togglePanel}
          />
        )}

        <SidebarUserAvatar isActive={isPanelOpen} onClick={togglePanel} />
      </Box>

      <SidebarPanel
        isOpen={isPanelOpen}
        activeLink={activeLink}
        destinations={destinations}
        isSubLinkActive={isSubLinkActive}
        onNavigate={navigate}
        onOpenSettings={openSettings}
        onLogout={handleLogout}
        onClosePanel={closePanel}
      />

      {isSettingsOpen && (
        <Suspense fallback={null}>
          <SettingsModal open={isSettingsOpen} onClose={closeSettings} />
        </Suspense>
      )}
    </>
  );
};

export default AppSidebar;
