import { Box, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import type { Theme } from "@mui/material";
import type { SidebarLogoutProps } from "@typings/ui/sidebar.types";


const SidebarLogout = ({ isHovered, onLogout }: SidebarLogoutProps) => (

  <Tooltip title={!isHovered ? "Cerrar sesión" : ""} placement="right">
    <Box
      onClick={onLogout}
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: isHovered ? "flex-start" : "center",
        gap: isHovered ? "10px" : 0,
        width: isHovered ? "100%" : "36px",
        height: "36px",
        px: isHovered ? "6px" : 0,
        ml: isHovered ? 0 : "auto",
        mr: isHovered ? 0 : "auto",
        borderRadius: "8px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        color: theme.custom?.translucidWhite,
        transition: "background 0.13s, color 0.13s, width 0.22s cubic-bezier(.4,0,.2,1)",
        "&:hover": {
          color: theme.custom?.darkWhite,
        },
      })}
    >
      <Box sx={{ fontSize: "1.1rem", flexShrink: 0, width: "24px", display: "flex", justifyContent: "center" }}>
        <LogoutIcon sx={{ fontSize: "1.1rem" }} />
      </Box>
      <Box
        sx={{
          fontSize: "11px",
          fontWeight: 500,
          letterSpacing: "0.04em",
          textTransform: "uppercase",
          opacity: isHovered ? 1 : 0,
          maxWidth: isHovered ? "160px" : 0,
          overflow: "hidden",
          transition: "opacity 0.15s 0.05s, max-width 0.22s cubic-bezier(.4,0,.2,1)",
        }}
      >
        Cerrar sesión
      </Box>
    </Box>
  </Tooltip>
);

export default SidebarLogout;