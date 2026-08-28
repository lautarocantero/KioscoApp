import { Box, Typography, type Theme } from "@mui/material";
import type { SidebarMobileNavRowProps } from "@typings/ui/sidebar.types";

// Fila de navegación del drawer mobile: ícono + label visible (a
// diferencia de SidebarRailItem, que en el riel de escritorio siempre
// muestra solo el ícono).
const SidebarMobileNavRow = ({ icon, label, isActive, onClick }: SidebarMobileNavRowProps): React.ReactNode => (
  <Box
    component="button"
    type="button"
    onClick={onClick}
    aria-current={isActive ? "page" : undefined}
    sx={(theme: Theme) => ({
      display: "flex",
      alignItems: "center",
      gap: "12px",
      width: "100%",
      height: "40px",
      px: "10px",
      border: "none",
      borderRadius: "8px",
      cursor: "pointer",
      backgroundColor: isActive ? theme.palette.primary.light : "transparent",
      color: theme.custom.white,
    })}
  >
    <Box sx={{ display: "flex", fontSize: "1.1rem" }}>{icon}</Box>
    <Typography sx={{ fontSize: "13px", fontWeight: 500, letterSpacing: "0.02em", textTransform: "uppercase" }}>
      {label}
    </Typography>
  </Box>
);

export default SidebarMobileNavRow;
