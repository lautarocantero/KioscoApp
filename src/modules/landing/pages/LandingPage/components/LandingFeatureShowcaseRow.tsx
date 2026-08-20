import { Stack, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LandingFeatureShowcaseRowProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";
import LandingFeatureShowcaseBadge from "./LandingFeatureShowcaseBadge";
import LandingFeatureShowcaseBullets from "./LandingFeatureShowcaseBullets";
import LandingFeatureShowcaseMedia from "./LandingFeatureShowcaseMedia";

const LandingFeatureShowcaseRow = ({ item, reverse }: LandingFeatureShowcaseRowProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, item.accent);

  return (
    <Stack
      direction={{ xs: "column", md: reverse ? "row-reverse" : "row" }}
      spacing={{ xs: 4, md: 6 }}
      alignItems="center"
      sx={{
        width: "100%",
        border: "1px solid",
        borderColor: (theme: Theme) => theme?.custom?.darkGray,
        borderRadius: "20px",
        padding: { xs: "1.5em", md: "2.5em" },
      }}
    >
      <Stack spacing={2.5} alignItems={{ xs: "center", md: "flex-start" }} sx={{ flex: 1, minWidth: 0 }}>
        <LandingFeatureShowcaseBadge label={t(item.badgeKey)} accent={item.accent} />

        <Typography
          component="h3"
          variant="h4"
          sx={{ color: (theme: Theme) => theme?.custom?.white, fontWeight: 700, textAlign: { xs: "center", md: "left" } }}
        >
          {t(item.titleStartKey)}
          <Typography component="span" variant="h4" sx={{ color: accentColor, fontWeight: 700 }}>
            {t(item.titleHighlightKey)}
          </Typography>
          {t(item.titleEndKey)}
        </Typography>

        <Typography
          variant="body1"
          sx={{ color: (theme: Theme) => theme?.custom?.darkWhite, textAlign: { xs: "center", md: "left" }, maxWidth: "440px" }}
        >
          {t(item.subtitleKey)}
        </Typography>

        <LandingFeatureShowcaseBullets bullets={item.bullets} accent={item.accent} />
      </Stack>

      <LandingFeatureShowcaseMedia src={item.mediaSrc} alt={t(item.mediaAltKey)} videoSrc={item.mediaVideoSrc} />
    </Stack>
  );
};

export default LandingFeatureShowcaseRow;
