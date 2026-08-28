import { Box, Typography, Tooltip, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SidebarSellButtonProps } from "@typings/ui/sidebar.types";
import { getPublicAssetUrl } from "../../../../helpers/getPublicAssetUrl";

// Único punto de entrada al catálogo: visible siempre, en cualquier
// sección, con atajo de teclado "V" (ver useSidebarShortcut). El logo PNG
// es blanco/claro — un fondo blanco lo vuelve invisible, por eso el estado
// activo/hover usa primary.dark (con anillo blanco) en vez de blanco sólido.
//
// variant="rail": cuadrado (no círculo) con ícono + label "Vender" abajo,
// para que se note que es la acción rápida al catálogo y no un ítem más
// del riel. variant="fab" (mobile) se mantiene circular, ícono solo — es
// un FAB flotante, no convive con el resto del riel.
const SidebarSellButton = ({ isActive, onClick, variant = "rail" }: SidebarSellButtonProps): React.ReactNode => {
  const isFab = variant === "fab";

  return (
    <Tooltip title="Vender (V)" placement="right">
      <Box
        component="button"
        type="button"
        onClick={onClick}
        aria-label="Vender"
        aria-current={isActive ? "page" : undefined}
        sx={(theme: Theme) => ({
          display: "flex",
          flexDirection: isFab ? "row" : "column",
          alignItems: "center",
          justifyContent: "center",
          gap: isFab ? 0 : "3px",
          width: isFab ? 56 : 56,
          height: isFab ? 56 : 52,
          borderRadius: isFab ? "50%" : "10px",
          border: isActive ? `2px solid ${theme.custom.white}` : "2px solid transparent",
          backgroundColor: isActive ? theme.palette.primary.dark : alpha(theme.custom.white, 0.12),
          cursor: "pointer",
          padding: 0,
          flexShrink: 0,
          transition: "background-color 0.15s, border-color 0.15s, transform 0.15s",
          ...(isFab
            ? {
                position: "fixed",
                bottom: 20,
                right: 20,
                zIndex: 1300,
                boxShadow: `0 4px 16px ${alpha(theme.custom.black, 0.35)}`,
              }
            : { mb: 1 }),
          "&:hover": {
            backgroundColor: theme.palette.primary.dark,
            transform: "scale(1.04)",
          },
          "&:focus-visible": {
            outline: `2px solid ${theme.custom.white}`,
            outlineOffset: "2px",
          },
        })}
      >
        <Box
          component="img"
          src={getPublicAssetUrl("images/logo/StocoLogoalt.png")}
          alt=""
          sx={{ width: isFab ? 32 : 22, height: isFab ? 32 : 22, objectFit: "contain" }}
        />
        {!isFab && (
          <Typography
            component="span"
            sx={(theme: Theme) => ({
              fontSize: "9px",
              fontWeight: 700,
              letterSpacing: "0.02em",
              lineHeight: 1,
              color: theme.custom.white,
            })}
          >
            Vender
          </Typography>
        )}
      </Box>
    </Tooltip>
  );
};

export default SidebarSellButton;
