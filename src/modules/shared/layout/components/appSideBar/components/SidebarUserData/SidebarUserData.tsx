import { memo } from "react";
import { Box } from "@mui/material";
import { useAppSidebar } from "../../hooks/useAppSidebar";
import SidebarUserAvatar from "./SidebarUserAvatar";
import SidebarUserInfo from "./SidebarUserInfo";
import SidebarUserSettings from "./SidebarUserSettings";
import { useSidebarUserData } from "../../hooks/useSidebarUserData";

const SidebarUserData = (): React.ReactNode => {
  const { userData, isLoading } = useSidebarUserData();
  const { avatarUrl, name, role } = userData;
  const { isExpanded } = useAppSidebar();

  if (isLoading || !userData) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: 1.5,
        width: "100%",
        px: 2,
        py: 1,
      }}
    >
      <SidebarUserAvatar avatarUrl={avatarUrl} name={name} />
      <SidebarUserInfo name={name} role={role} isExpanded={isExpanded} />
      <SidebarUserSettings isExpanded={isExpanded} />
    </Box>
  );
};

export default memo(SidebarUserData);