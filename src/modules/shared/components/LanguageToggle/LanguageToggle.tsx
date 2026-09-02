import { Box, type Theme } from "@mui/material";
import { useLanguageOption } from "@hooks/ui/useLanguageOption";
import { LanguageEnum } from "@typings/settings/settingsEnums";

// Mismo nivel/patrón que LightMode: toggle de dos estados (no un <select>),
// theme-aware para poder vivir fuera del navbar oscuro del landing.
const LanguageToggle = () => {
  const { language, setLanguage } = useLanguageOption();
  const isSpanish = language === LanguageEnum.Spanish;

  return (
    <Box
      component="button"
      type="button"
      role="switch"
      aria-checked={isSpanish}
      aria-label="Idioma / Language"
      onClick={() => setLanguage(isSpanish ? LanguageEnum.English : LanguageEnum.Spanish)}
      sx={(theme: Theme) => ({
        height: "36px",
        minWidth: "36px",
        padding: "0 10px",
        border: `1px solid ${theme?.custom?.darkGray}`,
        borderRadius: "0.4em",
        backgroundColor: theme?.custom?.background,
        color: theme?.custom?.darkWhite,
        fontSize: "0.75rem",
        fontWeight: 700,
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        "&:hover": {
          borderColor: theme?.palette?.primary?.main,
          color: theme?.palette?.primary?.main,
        },
      })}
    >
      {isSpanish ? "ES" : "EN"}
    </Box>
  );
};

export default LanguageToggle;
