import { Box, type Theme } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import type { SidebarPanelToggleProps } from "@typings/ui/sidebar.types";

// "Ocultar panel", pinneado abajo del todo. Cerrarlo no pierde nada: el
// riel sigue marcando la sección activa con su barra lateral.
//
// Efecto de "respiración": el color (texto + chevron, vía currentColor)
// oscila en loop entre translucidWhite y primary.main, para llamar la
// atención sin ser tan brusco como un pulso de escala. Se corta en hover
// (queda el color sólido de siempre) para no competir con esa interacción.
const SidebarPanelToggle = ({ onClick }: SidebarPanelToggleProps): React.ReactNode => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    aria-label="Ocultar panel"
    sx={(theme: Theme) => ({
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "6px",
      width: "100%",
      border: "none",
      borderTop: `1px solid ${theme.custom.darkGray}`,
      background: "none",
      cursor: "pointer",
      py: "10px",
      fontSize: "0.72rem",
      fontWeight: 500,
      letterSpacing: "0.04em",
      textTransform: "uppercase",
      color: theme.custom.translucidWhite,
      animation: "sidebar-panel-toggle-breathe 2.6s ease-in-out infinite",
      "@keyframes sidebar-panel-toggle-breathe": {
        "0%, 100%": { color: theme.custom.translucidWhite },
        "50%": { color: theme.palette.primary.main },
      },
      "&:hover": {
        animation: "none",
        color: theme.custom.white,
        backgroundColor: theme.custom.darkGray,
      },
    })}
  >
    <ChevronLeftIcon sx={{ fontSize: "1rem" }} />
    Ocultar panel
  </Box>
);

export default SidebarPanelToggle;
