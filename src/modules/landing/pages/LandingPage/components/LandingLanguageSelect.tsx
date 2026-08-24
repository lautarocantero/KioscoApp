import { MenuItem, Select, type SelectChangeEvent, type Theme } from "@mui/material";
import { useLanguageOption } from "@hooks/ui/useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";

const LandingLanguageSelect = (): React.ReactNode => {
  const { language, setLanguage } = useLanguageOption();

  const handleChange = (event: SelectChangeEvent) => setLanguage(event.target.value as LanguageEnum);

  return (
    <Select
      value={language}
      onChange={handleChange}
      variant="outlined"
      inputProps={{ "aria-label": "Idioma / Language" }}
      sx={{
        color: (theme: Theme) => theme?.custom?.white,
        borderRadius: "0.4em",
        fontSize: "0.7rem",
        ".MuiSelect-select": {
          padding: "13px 32px 13px 12px",
        },
        ".MuiOutlinedInput-notchedOutline": {
          borderColor: (theme: Theme) => theme?.custom?.darkGray,
        },
        ".MuiSvgIcon-root": {
          color: (theme: Theme) => theme?.custom?.darkWhite,
        },
      }}
    >
      {/* Los nombres de idioma se muestran siempre en su propio idioma (convención estándar de selectores de idioma), no se traducen. */}
      <MenuItem value={LanguageEnum.Spanish}>ES</MenuItem>
      <MenuItem value={LanguageEnum.English}>EN</MenuItem>
    </Select>
  );
};

export default LandingLanguageSelect;
