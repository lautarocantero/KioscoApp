import { Box, FormControl, FormControlLabel, Radio, RadioGroup, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useDownloadPdfOption } from "@hooks/ui/useDownloadPdfOption";

const MyShopDownloadPdfSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const { downloadPdfAfterSale, setDownloadPdfAfterSale } = useDownloadPdfOption();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDownloadPdfAfterSale(event.target.value === "true");

  return (
    <Box component="section" aria-labelledby="settings-myshop-download-pdf-heading" sx={{ maxWidth: 360 }}>
      <Typography
        id="settings-myshop-download-pdf-heading"
        component="h3"
        variant="h6"
        sx={(theme: Theme) => ({ color: theme.custom.fontColor, mb: 1 })}
      >
        {t("settings.myShop.downloadPdf.heading")}
      </Typography>

      <Typography sx={(theme: Theme) => ({ color: theme.custom.translucidFontColor, fontSize: "0.85rem", mb: 2 })}>
        {t("settings.myShop.downloadPdf.description")}
      </Typography>

      <FormControl>
        <RadioGroup
          aria-labelledby="settings-myshop-download-pdf-heading"
          value={String(downloadPdfAfterSale)}
          onChange={handleChange}
        >
          <FormControlLabel value="true" control={<Radio />} label={t("settings.myShop.downloadPdf.options.enabled")} />
          <FormControlLabel value="false" control={<Radio />} label={t("settings.myShop.downloadPdf.options.disabled")} />
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

export default MyShopDownloadPdfSection;
