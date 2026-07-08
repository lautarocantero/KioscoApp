import { memo } from "react";
import { Avatar } from "@mui/material";
import type { SidebarUserAvatarProps } from "@typings/account/accountComponentTypes";

const SidebarUserAvatar = ({ avatarUrl, name }: SidebarUserAvatarProps): React.ReactNode => {
  return (
    <Avatar
      src={avatarUrl}
      alt={name}
      sx={{
        width: 36,
        height: 36,
        flexShrink: 0,
        bgcolor: "common.white",
        color: "primary.main",
        fontSize: 14,
        fontWeight: 700,
      }}
    >
      {!avatarUrl && name.charAt(0).toUpperCase()}
    </Avatar>
  );
};

export default memo(SidebarUserAvatar);