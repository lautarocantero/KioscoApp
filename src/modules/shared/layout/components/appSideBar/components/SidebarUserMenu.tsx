import { Box, Typography, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import SettingsIcon from "@mui/icons-material/Settings";
import LogoutIcon from "@mui/icons-material/Logout";
import type { SidebarUserMenuProps } from "@typings/ui/sidebar.types";
import { AuthRoleEnum } from "@typings/auth/authEnums";
import { confirmColorEnum } from "@typings/ui/uiEnums";
import { getRoleLabel } from "../../../../helpers/getRoleLabel";
import { useSidebarLogoutConfirm } from "../hooks/useSidebarLogoutConfirm";
import ConfirmDialog from "../../../../components/ConfirmDialog/ConfirmDialog";

const menuItemSx = (theme: Theme) => ({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  width: "100%",
  border: "none",
  background: "none",
  borderRadius: "6px",
  cursor: "pointer",
  px: "12px",
  py: "8px",
  fontSize: "0.82rem",
  color: theme.custom.white,
  textDecoration: "none",
  "&:hover": { backgroundColor: theme.custom.darkGray },
});

// Absorbe lo que antes eran SidebarUserInfo + SidebarUserSettings +
// SidebarLogout: ahora vive todo junto, abajo del panel. Ya no repite los
// links de cuenta (AccountNavLinks) — "Editar cuenta" y "Plan de
// suscripción" ya están accesibles desde la propia página de Cuenta.
const SidebarUserMenu = ({ userData, onOpenSettings, onLogout }: SidebarUserMenuProps): React.ReactNode => {
  const { name, role } = userData;
  const isAdmin = role === AuthRoleEnum.Admin;
  const { isOpen, requestLogout, cancelLogout, confirmLogout } = useSidebarLogoutConfirm(onLogout);

  return (
    <Box sx={(theme: Theme) => ({ width: "100%", borderTop: `1px solid ${theme.custom.darkGray}`, pt: 1, pb: 1 })}>
      <Box sx={{ px: 2, pb: 1 }}>
        <Typography noWrap sx={(theme: Theme) => ({ fontSize: "0.85rem", fontWeight: 600, color: theme.custom.white })}>
          {name}
        </Typography>
        {role && (
          <Typography
            component="span"
            sx={(theme: Theme) => ({
              display: "inline-block",
              mt: "2px",
              px: 0.9,
              py: 0.2,
              borderRadius: "999px",
              fontSize: "0.6rem",
              fontWeight: 700,
              letterSpacing: "0.04em",
              textTransform: "uppercase",
              ...(isAdmin
                ? {
                    color: theme.custom.adminBadge.textColor,
                    background: `linear-gradient(135deg, ${theme.custom.adminBadge.gradientStart} 0%, ${theme.custom.adminBadge.gradientMid} 55%, ${theme.custom.adminBadge.gradientEnd} 100%)`,
                  }
                : {
                    color: theme.custom.translucidWhite,
                    background: alpha(theme.custom.white, 0.08),
                  }),
            })}
          >
            {getRoleLabel(role)}
          </Typography>
        )}
      </Box>

      <Box component="ul" sx={{ listStyle: "none", m: 0, px: 1 }}>
        <Box component="li">
          <Box component="button" type="button" onClick={onOpenSettings} sx={menuItemSx}>
            <SettingsIcon sx={{ fontSize: "1.05rem" }} />
            Ajustes
          </Box>
        </Box>

        <Box component="li">
          <Box component="button" type="button" onClick={requestLogout} sx={menuItemSx}>
            <LogoutIcon sx={{ fontSize: "1.05rem" }} />
            Cerrar sesión
          </Box>
        </Box>
      </Box>

      <ConfirmDialog
        open={isOpen}
        title="Cerrar sesión"
        description="¿Seguro que querés cerrar sesión?"
        confirmLabel="Cerrar sesión"
        cancelLabel="Cancelar"
        confirmColor={confirmColorEnum.Primary}
        icon={<LogoutIcon sx={{ fontSize: "1.6rem" }} />}
        onConfirm={confirmLogout}
        onCancel={cancelLogout}
      />
    </Box>
  );
};

export default SidebarUserMenu;
