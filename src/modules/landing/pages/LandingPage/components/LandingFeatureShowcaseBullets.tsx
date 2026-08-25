import { ButtonBase, Stack, Typography, useTheme, type Theme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { useTranslation } from "react-i18next";
import type { LandingFeatureShowcaseBulletsProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";

const LandingFeatureShowcaseBullets = ({ bullets, accent, onBulletClick }: LandingFeatureShowcaseBulletsProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, accent);

  return (
    <Stack component="ul" spacing={1.5} sx={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}>
      {bullets.map(({ Icon, labelKey, isClickable }) => (
        <Stack key={labelKey} component="li" direction="row" alignItems="center" spacing={1.5}>
          <Stack
            aria-hidden="true"
            alignItems="center"
            justifyContent="center"
            sx={{ width: 28, height: 28, borderRadius: "50%", backgroundColor: `${accentColor}22`, flexShrink: 0 }}
          >
            <Icon sx={{ fontSize: 16, color: accentColor }} />
          </Stack>
          {isClickable ? (
            <ButtonBase
              onClick={onBulletClick}
              sx={{
                borderRadius: "6px",
                px: 0.5,
                mx: -0.5,
                "&:hover": { textDecoration: "underline" },
              }}
            >
              <Typography variant="body2" sx={{ color: accentColor, fontWeight: 700, fontSize: { md: "1rem" } }}>
                {t(labelKey)}
              </Typography>
              <ChevronRightIcon aria-hidden="true" sx={{ fontSize: 20, color: accentColor, ml: 0.25 }} />
            </ButtonBase>
          ) : (
            <Typography
              variant="body2"
              sx={{ color: (theme: Theme) => theme?.custom?.white, fontWeight: 500, fontSize: { md: "1rem" } }}
            >
              {t(labelKey)}
            </Typography>
          )}
        </Stack>
      ))}
    </Stack>
  );
};

export default LandingFeatureShowcaseBullets;
