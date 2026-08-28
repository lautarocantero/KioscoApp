import { Box, Typography, type Theme } from "@mui/material";
import type { SidebarSectionLinksProps } from "@typings/ui/sidebar.types";

// Destinos de la sección activa (ex SidebarSubGroup/SidebarSubLink). Sin
// groupLabel: el panel ya tiene un solo grupo, el de la sección.
//
// key=label (no url): algunos destinos mock (ver NavDestinations.ts) todavía
// no tienen ruta propia y comparten url con otro destino de la misma lista.
//
// El borde + label "Páginas" separan esto de lo que venga antes (el botón
// de crear de SidebarSectionAction si existe, o si no el header/subtítulo
// de la sección) y dejan explícito que estos ítems son clickeables y llevan
// a otra parte de la app — sin el label podían leerse como texto informativo.
const SECTION_LINKS_HEADING_ID = "sidebar-section-links-heading";

const SidebarSectionLinks = ({ destinations, isSubLinkActive, onNavigate }: SidebarSectionLinksProps): React.ReactNode => {
  if (destinations.length === 0) return null;

  return (
    <Box sx={{ width: "100%" }}>
      <Typography
        id={SECTION_LINKS_HEADING_ID}
        component="p"
        sx={(theme: Theme) => ({
          px: 2,
          pt: 1.5,
          pb: 0.75,
          mt: 0.5,
          borderTop: `1px dotted ${theme.custom.darkGray}`,
          fontSize: "0.68rem",
          fontWeight: 700,
          letterSpacing: "0.06em",
          textTransform: "uppercase",
          color: theme.custom.translucidWhite,
        })}
      >
        Páginas
      </Typography>

      <Box component="ul" aria-labelledby={SECTION_LINKS_HEADING_ID} sx={{ listStyle: "none", m: 0, width: "100%", px: 1, pb: 1 }}>
        {destinations.map((destination) => {
          const isActive = isSubLinkActive(destination.url);

          return (
            <Box component="li" key={destination.label}>
              <Box
                component="button"
                type="button"
                onClick={() => onNavigate(destination.url)}
                aria-current={isActive ? "page" : undefined}
                sx={(theme: Theme) => ({
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "100%",
                  border: "none",
                  background: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  px: "12px",
                  py: "8px",
                  fontSize: "0.82rem",
                  fontWeight: isActive ? 600 : 400,
                  color: isActive ? theme.custom.white : theme.custom.translucidWhite,
                  transition: "background-color 0.12s, color 0.12s",
                  "&:hover": {
                    backgroundColor: theme.custom.darkGray,
                    color: theme.custom.white,
                  },
                })}
              >
                {destination.label}
                {destination.count !== undefined && Number(destination.count) > 0 && (
                  <Typography
                    component="span"
                    sx={(theme: Theme) => ({ fontSize: "0.72rem", fontWeight: 700, color: theme.palette.error.main })}
                  >
                    {destination.count}
                  </Typography>
                )}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

export default SidebarSectionLinks;
