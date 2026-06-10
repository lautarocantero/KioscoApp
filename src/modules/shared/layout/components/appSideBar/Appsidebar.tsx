import { Box } from "@mui/material";
import type { Theme } from "@mui/material";
import type { AppSidebarProps } from "@typings/ui/uiModules";
import { useAppSidebar } from "./useAppSidebar";
import SidebarLogo from "./components/SidebarLogo";
import SidebarNavItem from "./components/SidebarNavItem";
import SidebarLogout from "./components/SidebarLogout";

const AppSidebar = ({ isOptions }: AppSidebarProps) => {
  const {
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
  } = useAppSidebar();

  return (
    <Box
      component="nav"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      sx={(theme: Theme) => ({
        width: { xs: 0, sm: isHovered ? "220px" : "64px" },
        minWidth: { xs: 0, sm: isHovered ? "220px" : "64px" },
        overflow: "hidden",
        display: { xs: "none", sm: "flex" },
        flexDirection: "column",
        alignItems: "flex-start",
        py: 2.5,
        gap: 1,
        backgroundColor: dark ? theme.custom?.backgroundWave1 : theme.custom?.white,
        borderRight: dark
          ? `1px solid ${theme.custom?.whiteTranslucid}`
          : `1px solid ${theme.custom?.blackTranslucid}`,
        minHeight: "100vh",
        transition: "width 0.22s cubic-bezier(.4,0,.2,1), min-width 0.22s cubic-bezier(.4,0,.2,1)",
        zIndex: 1200,
        position: "relative",
      })}
    >
      <SidebarLogo dark={dark} onClick={() => navigate("/home")} />

      <Box sx={{ flex: 1, width: "100%", display: "flex", flexDirection: "column", gap: "2px", px: "8px", pl: isHovered ? "8px" : "14px" }}>
        {navLinks.map((link) => {
          const { subGroups, hasSubGroups, isActive, isOpen } = getLinkMeta(link);
          return (
            <SidebarNavItem
              key={link.url}
              link={link}
              dark={dark}
              isHovered={isHovered}
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

      <SidebarLogout dark={dark} isHovered={isHovered} onLogout={handleLogout} />
    </Box>
  );
};

export default AppSidebar;