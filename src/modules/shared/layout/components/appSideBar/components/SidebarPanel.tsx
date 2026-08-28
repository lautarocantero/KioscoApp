import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SidebarPanelProps } from "@typings/ui/sidebar.types";
import { SIDEBAR_RAIL_WIDTH, SIDEBAR_PANEL_WIDTH } from "../../../../../../config/constants";
import { useSidebarUserData } from "../hooks/useSidebarUserData";
import SidebarKioscoCard from "./SidebarKioscoCard";
import SidebarSectionHeader from "./SidebarSectionHeader";
import SidebarSectionAction from "./SidebarSectionAction";
import SidebarSectionLinks from "./SidebarSectionLinks";
import SidebarUserMenu from "./SidebarUserMenu";
import SidebarPanelToggle from "./SidebarPanelToggle";

// Overlay que flota sobre el contenido — nunca lo empuja. Entra/sale con
// translateX en vez de animar el ancho, así el layout nunca hace reflow.
// El texto va sobre este fondo semi-opaco + blur, no sobre el blur crudo,
// para que se mantenga legible (ver Sidebar Stocko.md, sección 3).
//
// backgroundColor: la propuesta pide un rgba fijo (38,29,60,.72) — acá se
// deriva de custom.darkBackground con alpha() para no inventar un hex que
// no vive en el theme (ver CLAUDE.md, sección 4).
const SidebarPanel = ({
  isOpen,
  activeLink,
  destinations,
  isSubLinkActive,
  onNavigate,
  onOpenSettings,
  onLogout,
  onClosePanel,
}: SidebarPanelProps): React.ReactNode => {
  const { userData, isLoading } = useSidebarUserData();

  return (
    <Box
      component="aside"
      aria-hidden={!isOpen}
      aria-label="Panel de sección"
      sx={(theme: Theme) => ({
        // fixed (no absolute): se renderiza como hermano del riel, no
        // adentro — necesita posicionarse contra el viewport, no contra
        // un ancestro con position:relative que acá no existe.
        position: "fixed",
        left: { xs: 0, sm: SIDEBAR_RAIL_WIDTH },
        top: 0,
        bottom: 0,
        display: { xs: "none", sm: "flex" },
        width: SIDEBAR_PANEL_WIDTH,
        zIndex: 1199,
        flexDirection: "column",
        transform: isOpen ? "translateX(0)" : "translateX(-100%)",
        transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
        pointerEvents: isOpen ? "auto" : "none",
        backgroundColor: alpha(theme.custom.darkBackground, 0.85),
        backdropFilter: "blur(22px) saturate(150%)",
        boxShadow: `4px 0 24px ${alpha(theme.custom.black, 0.25)}`,
        overflowY: "auto",
      })}
    >
      <SidebarKioscoCard />

      {activeLink && (
        <>
          <SidebarSectionHeader key={activeLink.url} link={activeLink} />
          {activeLink.action && <SidebarSectionAction action={activeLink.action} onNavigate={onNavigate} />}
          <SidebarSectionLinks destinations={destinations} isSubLinkActive={isSubLinkActive} onNavigate={onNavigate} />
        </>
      )}

      <Box sx={{ flex: 1 }} />

      {!isLoading && userData && (
        <SidebarUserMenu userData={userData} onOpenSettings={onOpenSettings} onLogout={onLogout} />
      )}

      <SidebarPanelToggle onClick={onClosePanel} />
    </Box>
  );
};

export default SidebarPanel;
