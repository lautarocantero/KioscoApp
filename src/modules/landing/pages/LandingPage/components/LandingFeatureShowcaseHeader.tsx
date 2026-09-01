import { Box, Stack, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LandingFeatureShowcaseRowProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";
import LandingFeatureShowcaseBadge from "./LandingFeatureShowcaseBadge";
import LandingFeatureShowcaseSaves from "./LandingFeatureShowcaseSaves";

const LandingFeatureShowcaseHeader = ({ item, reverse }: LandingFeatureShowcaseRowProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, item.accent);

  return (
    <Stack
      direction={{ xs: "column", md: reverse ? "row-reverse" : "row" }}
      spacing={{ xs: 3, md: 5 }}
      alignItems="flex-start"
      sx={{ width: "100%" }}
    >
      <Box sx={{ flexShrink: 1, minWidth: 0, maxWidth: { xs: "100%", md: "45%" } }}>
        <LandingFeatureShowcaseBadge label={t(item.badgeKey)} accent={item.accent} />
      </Box>

      <Stack spacing={2} sx={{ flex: 1, minWidth: 0 }}>
        <Typography
          component="h3"
          variant="h4"
          sx={{
            color: (theme: Theme) => theme?.custom?.white,
            fontWeight: 700,
            fontSize: { xs: "1.75rem", md: "2rem" },
            textWrap: "pretty",
          }}
        >
          {t(item.titleStartKey)}
          <Box component="span" sx={{ color: accentColor }}>
            {t(item.titleHighlightKey)}
          </Box>
          {t(item.titleEndKey)}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: (theme: Theme) => theme?.custom?.darkWhite,
            maxWidth: 640,
            fontSize: { md: "1.1rem" },
            textWrap: "pretty",
          }}
        >
          {t(item.subtitleKey)}
        </Typography>

        <LandingFeatureShowcaseSaves text={t("landing.showcase.saves", { value: t(item.savesKey) })} />
      </Stack>
    </Stack>
  );
};

export default LandingFeatureShowcaseHeader;
