import { memo } from "react";
import { IconButton } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import type { SidebarUserSettingsProps } from "@typings/account/accountComponentTypes";
import { useNavigate } from "react-router-dom";

const SidebarUserSettings = ({ isExpanded }: SidebarUserSettingsProps): React.ReactNode => {
  const navigate = useNavigate();

  if (!isExpanded) return null;

  return (
    <IconButton
      onClick={()=> navigate("/account")}
      size="small"
      aria-label="Configuración de la cuenta"
      sx={{ color: "common.white", flexShrink: 0 }}
    >
      <SettingsIcon fontSize="small" />
    </IconButton>
  );
};

export default memo(SidebarUserSettings);