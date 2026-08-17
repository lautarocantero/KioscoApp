import { Box, IconButton, Typography, type Theme } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import SettingsIcon from "@mui/icons-material/Settings";
import { useTranslation } from "react-i18next";
import type { SettingsModalHeaderProps } from "@typings/settings/settingsComponentTypes";

const SettingsModalHeader = ({ onClose }: SettingsModalHeaderProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Box
      sx={(theme: Theme) => ({
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        px: 3,
        py: 2,
        borderBottom: `1px solid ${theme.custom.darkGray}`,
        flexShrink: 0,
      })}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
        <SettingsIcon sx={(theme: Theme) => ({ color: theme.palette.primary.main })} />
        <Typography
          id="settings-modal-title"
          component="h2"
          variant="h6"
          sx={(theme: Theme) => ({ color: theme.custom.fontColor, fontWeight: 700 })}
        >
          {t("settings.title")}
        </Typography>
      </Box>

      <IconButton onClick={onClose} aria-label={t("settings.close")} sx={(theme: Theme) => ({ color: theme.custom?.lightGray })}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default SettingsModalHeader;
