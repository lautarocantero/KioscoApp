import { Stack, Typography, type Theme } from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useTranslation } from "react-i18next";
import type { LandingHeroBenefitsProps } from "@typings/landing/landingComponentTypes";

const LandingHeroBenefits = ({ benefits }: LandingHeroBenefitsProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Stack component="ul" spacing={2} alignItems="flex-start" sx={{ listStyle: "none", margin: 0, padding: 0 }}>
      {benefits.map(({ labelKey }) => (
        <Stack key={labelKey} component="li" direction="row" spacing={1.5} alignItems="center">
          <CheckIcon
            aria-hidden="true"
            sx={{ flexShrink: 0, fontSize: 22, color: (theme: Theme) => theme?.custom?.accents?.green }}
          />
          <Typography
            variant="body1"
            sx={{
              color: (theme: Theme) => theme?.custom?.white,
              fontSize: { xs: "1rem", md: "1.15rem" },
              lineHeight: 1.35,
            }}
          >
            {t(labelKey)}
          </Typography>
        </Stack>
      ))}
    </Stack>
  );
};

export default LandingHeroBenefits;
