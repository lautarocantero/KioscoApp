import { memo } from "react";
import { Avatar, Box, Tooltip, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import type { SidebarUserAvatarProps } from "@typings/account/accountComponentTypes";
import { useSidebarUserData } from "../hooks/useSidebarUserData";

// Control de usuario del riel: abre el panel en SidebarUserMenu. Se
// resuelve solo (mismo patrón que SidebarKioscoCard) para no tener que
// bajar userData por props desde Appsidebar.
const SidebarUserAvatar = ({ onClick, isActive }: SidebarUserAvatarProps): React.ReactNode => {
  const { userData, isLoading } = useSidebarUserData();

  if (isLoading || !userData) return null;

  const { avatarUrl, name } = userData;

  return (
    <Tooltip title={name} placement="right">
      <Box
        component="button"
        type="button"
        onClick={onClick}
        aria-label={`Usuario: ${name}`}
        sx={(theme: Theme) => ({
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          border: "none",
          borderRadius: "50%",
          background: isActive ? alpha(theme.custom.white, 0.24) : "none",
          cursor: "pointer",
          p: "3px",
          "&:focus-visible": {
            outline: `2px solid ${theme.custom.white}`,
            outlineOffset: "2px",
          },
        })}
      >
        <Avatar
          src={avatarUrl}
          alt={name}
          sx={{
            width: 32,
            height: 32,
            bgcolor: "common.white",
            color: "primary.main",
            fontSize: 13,
            fontWeight: 700,
          }}
        >
          {!avatarUrl && name.charAt(0).toUpperCase()}
        </Avatar>
      </Box>
    </Tooltip>
  );
};

export default memo(SidebarUserAvatar);
