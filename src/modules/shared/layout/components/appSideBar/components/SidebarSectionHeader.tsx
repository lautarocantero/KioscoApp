import { Box, Skeleton, Typography, type Theme } from "@mui/material";
import type { SidebarSectionHeaderProps } from "@typings/ui/sidebar.types";
import { useLinkCard } from "../../../../components/OptionsItems/hooks/useLinkCard";

// Título + subtítulo de la sección activa del panel. Reusa useLinkCard
// (mismo hook que LinkCard) para resolver el subtítulo con dato real
// cuando el link trae useData — evita reimplementar ese fetch.
//
// Importante: se debe montar con key={link.url} desde el padre. useLinkCard
// llama a un hook distinto según link.useData, así que si esta instancia
// sobreviviera a un cambio de sección activa (mismo componente, distinto
// link) rompería las reglas de hooks.
const SidebarSectionHeader = ({ link }: SidebarSectionHeaderProps): React.ReactNode => {
  const { description, subtitle, isLoading } = useLinkCard({ link });

  return (
    <Box sx={{ width: "100%", px: 2, pt: 2, pb: 1 }}>
      <Typography
        component="h2"
        sx={(theme: Theme) => ({
          fontSize: "0.95rem",
          fontWeight: 700,
          color: theme.custom.white,
          lineHeight: 1.2,
        })}
      >
        {description}
      </Typography>

      {isLoading ? (
        <Skeleton variant="text" width="70%" height={16} sx={(theme: Theme) => ({ bgcolor: theme.custom.darkGray })} />
      ) : (
        subtitle && (
          <Typography sx={(theme: Theme) => ({ fontSize: "0.75rem", color: theme.custom.translucidWhite, mt: "2px" })}>
            {subtitle}
          </Typography>
        )
      )}
    </Box>
  );
};

export default SidebarSectionHeader;
