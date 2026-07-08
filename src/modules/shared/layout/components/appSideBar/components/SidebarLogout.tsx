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
        gap: "10px",
        width: "calc(100% - 16px)",
        height: "36px",
        px: "6px",
        borderRadius: "8px",
        cursor: "pointer",
        whiteSpace: "nowrap",
        color: theme.custom?.translucidWhite,
        transition: "background 0.13s, color 0.13s",
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
          transition: "opacity 0.15s 0.05s",
        }}
      >
        Cerrar sesión
      </Box>
    </Box>
  </Tooltip>
);

export default SidebarLogout;