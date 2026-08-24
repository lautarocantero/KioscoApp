import { Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LandingNavLinksProps } from "@typings/landing/landingComponentTypes";

const LandingNavLinks = ({ links, onLinkClick }: LandingNavLinksProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Stack
      component="nav"
      aria-label={t("landing.nav.features")}
      direction="row"
      spacing={4}
      sx={{ display: { xs: "none", md: "flex" } }}
    >
      {links.map((link) => (
        <Typography
          key={link.targetId}
          component="button"
          onClick={() => onLinkClick(link.targetId)}
          sx={{
            background: "none",
            border: "none",
            cursor: "pointer",
            color: (theme: Theme) => theme?.custom?.darkWhite,
            fontSize: (theme: Theme) => theme?.typography?.body2?.fontSize,
            fontWeight: 500,
            "&:hover": { color: (theme: Theme) => theme?.custom?.white },
            "&:focus-visible": {
              outline: (theme: Theme) => `2px solid ${theme.palette.primary.main}`,
              outlineOffset: "2px",
            },
          }}
        >
          {t(link.labelKey)}
        </Typography>
      ))}
    </Stack>
  );
};

export default LandingNavLinks;
