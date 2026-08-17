import { Box, Slider, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useFontSizeOption } from "@hooks/ui/useFontSizeOption";
import { FONT_SIZE_DEFAULT, FONT_SIZE_MAX, FONT_SIZE_MIN } from "../../../../../config/constants";

const AppearanceFontSizeSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { fontSize, setFontSize } = useFontSizeOption();

  const handleChange = (_event: Event, value: number | number[]) => {
    setFontSize(Array.isArray(value) ? value[0] : value);
  };

  return (
    <Box component="section" aria-labelledby="settings-appearance-font-size-heading" sx={{ maxWidth: 420 }}>
      <Typography
        id="settings-appearance-font-size-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 1 })}
      >
        {t("settings.appearance.fontSize.heading")}
      </Typography>

      <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mb: 4 })}>
        {t("settings.appearance.fontSize.description")}
      </Typography>

      <Slider
        aria-labelledby="settings-appearance-font-size-heading"
        value={fontSize}
        onChange={handleChange}
        min={FONT_SIZE_MIN}
        max={FONT_SIZE_MAX}
        step={1}
        marks={[
          { value: FONT_SIZE_MIN, label: `${FONT_SIZE_MIN}px` },
          { value: FONT_SIZE_DEFAULT, label: `${FONT_SIZE_DEFAULT}px` },
          { value: FONT_SIZE_MAX, label: `${FONT_SIZE_MAX}px` },
        ]}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `${value}px`}
        sx={(theme: Theme) => ({
          // Resalta la marca del tamaño por defecto (índice 1: min, default, max)
          // para que el usuario sepa a dónde volver si mueve el slider.
          "& .MuiSlider-mark[data-index='1']": {
            height: 10,
            width: 3,
            backgroundColor: theme.palette.primary.main,
          },
          "& .MuiSlider-markLabel[data-index='1']": {
            color: theme.palette.primary.main,
            fontWeight: 700,
          },
        })}
      />
    </Box>
  );
};

export default AppearanceFontSizeSection;
