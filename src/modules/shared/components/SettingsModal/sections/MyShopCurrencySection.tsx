import { Box, FormControl, InputLabel, MenuItem, Select, Typography, type SelectChangeEvent, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { sharedSx } from "../../sharedSx/sharedSx";
import { useCurrencyOption } from "@hooks/ui/useCurrencyOption";
import { Currency } from "@typings/sells/sellsEnum";
import { CURRENCY_OPTIONS } from "../../../../../config/constants";

const MyShopCurrencySection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { currency, setCurrency } = useCurrencyOption();

  const handleChange = (event: SelectChangeEvent) => setCurrency(event.target.value as Currency);

  return (
    <Box component="section" aria-labelledby="settings-myshop-currency-heading" sx={{ maxWidth: 360 }}>
      <Typography
        id="settings-myshop-currency-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 1 })}
      >
        {t("settings.myShop.currency.heading")}
      </Typography>

      <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mb: 2 })}>
        {t("settings.myShop.currency.description")}
      </Typography>

      <FormControl fullWidth variant="outlined" sx={sharedSx}>
        <InputLabel id="settings-currency-select-label">{t("settings.myShop.currency.selectLabel")}</InputLabel>
        <Select
          labelId="settings-currency-select-label"
          id="settings-currency-select"
          value={currency}
          label={t("settings.myShop.currency.selectLabel")}
          onChange={handleChange}
        >
          {CURRENCY_OPTIONS.map(({ value }) => (
            <MenuItem key={value} value={value}>
              {t(`settings.myShop.currency.options.${value}`)}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default MyShopCurrencySection;
