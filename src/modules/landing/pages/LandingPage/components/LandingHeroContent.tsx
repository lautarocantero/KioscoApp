import { Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import LandingHeroBadge from "./LandingHeroBadge";

const LandingHeroContent = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Stack spacing={3} alignItems={{ xs: "center", md: "flex-start" }} sx={{ flex: 1, minWidth: 0 }}>
      <LandingHeroBadge />

      <Typography
        component="h1"
        variant="h2"
        sx={{
          color: (theme: Theme) => theme?.custom?.white,
          fontWeight: 700,
          textAlign: { xs: "center", md: "left" },
          fontSize: { xs: "2.25rem", md: "3.5rem" },
        }}
      >
        {t("landing.hero.titleStart")}
        <Typography
          component="span"
          variant="h2"
          sx={{
            color: (theme: Theme) => theme?.custom?.accents?.gold,
            fontWeight: 800,
            fontSize: { xs: "2.25rem", md: "3.5rem" },
          }}
        >
          {t("landing.hero.titleHighlight")}
        </Typography>
      </Typography>

      <Typography
        variant="body1"
        sx={{
          color: (theme: Theme) => theme?.custom?.darkWhite,
          textAlign: { xs: "center", md: "left" },
          maxWidth: "480px",
          fontSize: { xs: "1.1rem", md: "1.3rem" },
        }}
      >
        {t("landing.hero.subtitle")}
      </Typography>
    </Stack>
  );
};

export default LandingHeroContent;
