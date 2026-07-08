import { memo } from "react";
import { Box, Typography, type Theme } from "@mui/material";
import type { SidebarUserInfoProps } from "@typings/account/accountComponentTypes";

const SidebarUserInfo = ({ name, role, isExpanded }: SidebarUserInfoProps): React.ReactNode => {
  if (!isExpanded) return null;

  return (
    <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, flex: 1, overflow: "hidden" }}>
      <Typography variant="body2" noWrap sx={(theme: Theme) => ({ color: theme.custom.white, fontWeight: 600, lineHeight: 1.2 })}>
        {name}
      </Typography>
      {role && (
        <Typography variant="caption" noWrap sx={(theme: Theme) => ({ color: theme.custom.translucidWhite , lineHeight: 1.2 })}>
          {role}
        </Typography>
      )}
    </Box>
  );
};

export default memo(SidebarUserInfo);
