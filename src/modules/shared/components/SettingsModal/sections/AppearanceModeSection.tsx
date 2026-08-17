import { Box, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sharedSx } from "../../sharedSx/sharedSx";
import { useThemeModeOption } from "@hooks/ui/useThemeModeOption";
import { ThemeModeEnum } from "@typings/settings/settingsEnums";

const AppearanceModeSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { mode, setMode } = useThemeModeOption();

  const handleChange = (event: SelectChangeEvent) => setMode(event.target.value as ThemeModeEnum);

  return (
    <Box component="section" aria-labelledby="settings-appearance-mode-heading" sx={{ maxWidth: 320 }}>
      <Typography
        id="settings-appearance-mode-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 2 })}
      >
        {t("settings.appearance.mode.heading")}
      </Typography>

      <FormControl fullWidth variant="outlined" sx={sharedSx}>
        <InputLabel id="settings-mode-select-label">{t("settings.appearance.mode.selectLabel")}</InputLabel>
        <Select
          labelId="settings-mode-select-label"
          id="settings-mode-select"
          value={mode}
          label={t("settings.appearance.mode.selectLabel")}
          onChange={handleChange}
        >
          <MenuItem value={ThemeModeEnum.Light}>{t("settings.appearance.mode.light")}</MenuItem>
          <MenuItem value={ThemeModeEnum.Dark}>{t("settings.appearance.mode.dark")}</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AppearanceModeSection;
