import { Box, Tooltip, Typography, type Theme } from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import StoreIcon from "@mui/icons-material/Store";
import { alpha } from "@mui/material/styles";
import type { SidebarKioscoSwitcherProps } from "@typings/ui/sidebar.types";

// Control de "tienda activa" del riel: ícono + iniciales + chevron. Al
// tocarlo abre el panel en la tarjeta de tienda (SidebarKioscoCard).
const SidebarKioscoSwitcher = ({ name, initials, isActive, onClick }: SidebarKioscoSwitcherProps): React.ReactNode => (
  <Tooltip title={`Tienda: ${name}`} placement="right">
    <Box
      component="button"
      type="button"
      onClick={onClick}
      aria-label={`Tienda activa: ${name}`}
      sx={(theme: Theme) => ({
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "2px",
        width: "56px",
        border: "none",
        borderRadius: "8px",
        py: "6px",
        cursor: "pointer",
        color: theme.custom.white,
        backgroundColor: isActive ? alpha(theme.custom.white, 0.24) : "transparent",
        transition: "background-color 0.15s",
        "&:hover": {
          backgroundColor: theme.palette.primary.light,
        },
        "&:focus-visible": {
          outline: `2px solid ${theme.custom.white}`,
          outlineOffset: "2px",
        },
      })}
    >
      <StoreIcon sx={{ fontSize: "1.1rem" }} />
      <Typography sx={{ fontSize: "9px", fontWeight: 700, letterSpacing: "0.04em" }}>
        {initials}
      </Typography>
      <ExpandMoreIcon sx={{ fontSize: "0.85rem", opacity: 0.8 }} />
    </Box>
  </Tooltip>
);

export default SidebarKioscoSwitcher;
