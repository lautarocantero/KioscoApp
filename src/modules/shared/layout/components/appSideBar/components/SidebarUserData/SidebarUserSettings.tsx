import { memo } from "react";
import { IconButton, Tooltip } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import type { SidebarUserSettingsProps } from "@typings/account/accountComponentTypes";

const SidebarUserSettings = ({ isExpanded, onOpenSettings }: SidebarUserSettingsProps): React.ReactNode => (
  <Tooltip title={!isExpanded ? "Abrir ajustes" : ""} placement="right">
    <IconButton
      onClick={onOpenSettings}
      size="small"
      aria-label="Abrir ajustes"
      sx={{ color: "common.white", flexShrink: 0, order: isExpanded ? 0 : -1 }}
    >
      <SettingsIcon fontSize="small" />
    </IconButton>
  </Tooltip>
);

export default memo(SidebarUserSettings);
