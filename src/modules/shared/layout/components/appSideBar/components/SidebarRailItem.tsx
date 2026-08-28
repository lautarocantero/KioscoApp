import { Box, Tooltip, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SidebarRailItemProps } from "@typings/ui/sidebar.types";

// Ítem del riel: siempre ícono solo (el riel nunca se expande), con el
// texto disponible vía tooltip y una barra lateral para marcar la sección
// activa — así nunca se pierde de vista en qué sección se está aunque el
// panel esté cerrado.
const SidebarRailItem = ({ link, isActive, onClick }: SidebarRailItemProps): React.ReactNode => {
  const { icon, description } = link;

  return (
    <Tooltip title={description} placement="right">
      <Box
        component="button"
        type="button"
        onClick={() => onClick(link)}
        aria-label={description}
        aria-current={isActive ? "page" : undefined}
        sx={(theme: Theme) => ({
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          width: "44px",
          height: "36px",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          padding: 0,
          color: theme.custom.white,
          backgroundColor: isActive ? alpha(theme.custom.white, 0.24) : "transparent",
          transition: "background-color 0.15s, color 0.15s",
          fontSize: "1.1rem",
          "&:hover": {
            backgroundColor: theme.palette.primary.light,
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.custom.white}`,
            outlineOffset: "2px",
          },
        })}
      >
        {isActive && (
          <Box
            aria-hidden="true"
            sx={(theme: Theme) => ({
              position: "absolute",
              left: "-8px",
              top: "6px",
              bottom: "6px",
              width: "3px",
              borderRadius: "3px",
              backgroundColor: theme.custom.white,
            })}
          />
        )}
        {icon}
      </Box>
    </Tooltip>
  );
};

export default SidebarRailItem;
