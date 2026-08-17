import { Box, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sharedSx } from "../../sharedSx/sharedSx";
import { useLanguageOption } from "@hooks/ui/useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";

const AppearanceLanguageSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { language, setLanguage } = useLanguageOption();

  const handleChange = (event: SelectChangeEvent) => setLanguage(event.target.value as LanguageEnum);

  return (
    <Box component="section" aria-labelledby="settings-appearance-language-heading" sx={{ maxWidth: 320 }}>
      <Typography
        id="settings-appearance-language-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 2 })}
      >
        {t("settings.appearance.language.heading")}
      </Typography>

      <FormControl fullWidth variant="outlined" sx={sharedSx}>
        <InputLabel id="settings-language-select-label">{t("settings.appearance.language.selectLabel")}</InputLabel>
        <Select
          labelId="settings-language-select-label"
          id="settings-language-select"
          value={language}
          label={t("settings.appearance.language.selectLabel")}
          onChange={handleChange}
        >
          {/* Los nombres de idioma se muestran siempre en su propio idioma (convención estándar de selectores de idioma), no se traducen. */}
          <MenuItem value={LanguageEnum.Spanish}>Español</MenuItem>
          <MenuItem value={LanguageEnum.English}>English</MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
};

export default AppearanceLanguageSection;
