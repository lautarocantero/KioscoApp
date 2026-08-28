import { Box, type Theme } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import type { SidebarSectionActionProps } from "@typings/ui/sidebar.types";

// Acción única de la sección (ex sublink "Crear"), ahora un CTA propio
// arriba de los destinos en vez de un ítem más de la lista.
const SidebarSectionAction = ({ action, onNavigate }: SidebarSectionActionProps): React.ReactNode => (
  <Box sx={{ width: "100%", px: 2, pb: 1 }}>
    <Box
      component="button"
      type="button"
      onClick={() => onNavigate(action.url)}
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        gap: "8px",
        width: "100%",
        border: "none",
        borderRadius: "8px",
        cursor: "pointer",
        px: "12px",
        py: "8px",
        fontSize: "0.8rem",
        fontWeight: 600,
        color: theme.custom.white,
        backgroundColor: theme.custom.darkMain,
        transition: "background-color 0.15s",
        "&:hover": {
          backgroundColor: theme.palette.primary.main,
        },
      })}
    >
      <AddIcon sx={{ fontSize: "1rem" }} />
      {action.label}
    </Box>
  </Box>
);

export default SidebarSectionAction;
