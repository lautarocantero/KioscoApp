// SidebarUserData.tsx
import { memo } from "react";
import { Box } from "@mui/material";
import SidebarUserAvatar from "./SidebarUserAvatar";
import SidebarUserInfo from "./SidebarUserInfo";
import SidebarUserSettings from "./SidebarUserSettings";
import { useSidebarUserData } from "../../hooks/useSidebarUserData";
import type { SidebarUserDataProps } from "@typings/ui/sidebar.types";


const SidebarUserData = ({ isExpanded, onOpenSettings }: SidebarUserDataProps): React.ReactNode => {
  const { userData, isLoading } = useSidebarUserData();
  const { avatarUrl, name, role } = userData ?? {};

  if (isLoading || !userData) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: isExpanded ? "row" : "column",
        alignItems: "center",
        justifyContent: "center",
        gap: isExpanded ? 1.5 : 0.75,
        width: "100%",
        px: isExpanded ? 2 : 0,
        py: 1,
      }}
    >
      <SidebarUserAvatar avatarUrl={avatarUrl} name={name} />
      <SidebarUserInfo name={name} role={role} isExpanded={isExpanded} />
      <SidebarUserSettings isExpanded={isExpanded} onOpenSettings={onOpenSettings} />
    </Box>
  );
};

export default memo(SidebarUserData);