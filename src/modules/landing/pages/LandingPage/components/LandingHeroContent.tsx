import { Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getLandingHeroBenefits } from "../../../helpers/getLandingHeroBenefits";
import LandingHeroBenefits from "./LandingHeroBenefits";

const LandingHeroContent = (): React.ReactNode => {
  const { t } = useTranslation();
  const benefits = getLandingHeroBenefits();

  return (
    <Stack spacing={4} alignItems={{ xs: "center", md: "flex-start" }} sx={{ flex: 1, minWidth: 0 }}>
      <Typography
        component="h1"
        variant="h2"
        sx={{
          color: (theme: Theme) => theme?.custom?.white,
          fontWeight: 700,
          textAlign: { xs: "center", md: "left" },
          fontSize: { xs: "2.25rem", md: "3.6rem" },
          lineHeight: 1.06,
        }}
      >
        {t("landing.hero.titleStart")}
        <Typography
          component="span"
          variant="h2"
          sx={{
            color: (theme: Theme) => theme?.custom?.accents?.gold,
            fontWeight: 800,
            fontSize: { xs: "2.25rem", md: "3.6rem" },
          }}
        >
          {t("landing.hero.titleHighlight")}
        </Typography>
      </Typography>

      <LandingHeroBenefits benefits={benefits} />
    </Stack>
  );
};

export default LandingHeroContent;
