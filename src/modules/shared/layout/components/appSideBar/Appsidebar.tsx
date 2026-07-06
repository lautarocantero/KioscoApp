import type { Theme } from "@mui/material";
import { Box, IconButton } from "@mui/material";
import LastPageIcon from "@mui/icons-material/LastPage";
import SidebarLogout from "./components/SidebarLogout";
import SidebarNavItem from "./components/SidebarNavItem";
import { useAppSidebar } from "./useAppSidebar";

const COLLAPSED_WIDTH = "72px";
const EXPANDED_WIDTH = "220px";

const AppSidebar = () => {
  const {
    dark,
    isExpanded,
    toggleSidebar,
    navLinks,
    handleNavClick,
    handleLogout,
    getLinkMeta,
    isSubLinkActive,
    navigate,
  } = useAppSidebar();

  return (
    <>
      {/* ── Espaciador: reserva el ancho fijo en el flujo, nunca cambia ── */}
      <Box
        sx={{
          width: { xs: 0, sm: COLLAPSED_WIDTH },
          minWidth: { xs: 0, sm: COLLAPSED_WIDTH },
          flexShrink: 0,
          height: "100vh",
        }}
      />

      {/* ── Panel visual: flota por encima, se expande sin empujar nada ── */}
      <Box
        component="nav"
        sx={(theme: Theme) => ({
          width: { xs: 0, sm: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH },
          minWidth: { xs: 0, sm: isExpanded ? EXPANDED_WIDTH : COLLAPSED_WIDTH },
          overflow: "hidden",
          display: { xs: "none", sm: "flex" },
          flexDirection: "column",
          alignItems: "flex-start",
          py: 2.5,
          gap: 1,
          borderRight: dark
            ? `1px solid ${theme.custom?.translucidWhite}`
            : `1px solid ${theme.custom?.blackTranslucid}`,
          height: "100vh",
          position: "fixed",
          top: 0,
          left: 0,
          transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
          zIndex: 1200,
          backgroundColor: theme.custom?.darkBackground,
          boxShadow: isExpanded ? "4px 0 24px rgba(0,0,0,0.25)" : "none",
        })}
      >
        {/* ── Botón toggle ── */}
        <Box sx={{ width: "100%", display: "flex", justifyContent: isExpanded ? "flex-end" : "center", px: isExpanded ? "10px" : 0 }}>
          <IconButton
            onClick={toggleSidebar}
            size="small"
            sx={(theme: Theme) => ({
              color: theme.custom?.white,
              transition: "transform 0.22s cubic-bezier(.4,0,.2,1)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
            })}
          >
            <LastPageIcon sx={{ fontSize: "1.2rem" }} />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: "2px", px: "8px", pl: isExpanded ? "8px" : "18px" }}>
          {navLinks.map((link) => {
            const { subGroups, hasSubGroups, isActive, isOpen } = getLinkMeta(link);
            return (
              <SidebarNavItem
                key={link.url}
                link={link}
                dark={dark}
                isHovered={isExpanded}
                isActive={isActive}
                isOpen={isOpen}
                hasSubGroups={hasSubGroups}
                subGroups={subGroups}
                onRowClick={handleNavClick}
                isSubLinkActive={isSubLinkActive}
                onNavigate={navigate}
              />
            );
          })}
        </Box>

        <SidebarLogout dark={dark} isHovered={isExpanded} onLogout={handleLogout} />
      </Box>
    </>
  );
};

export default AppSidebar;