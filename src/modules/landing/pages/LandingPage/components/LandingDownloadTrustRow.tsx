import { Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LandingDownloadTrustRowProps } from "@typings/landing/landingComponentTypes";

const LandingDownloadTrustRow = ({ points }: LandingDownloadTrustRowProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Stack
      component="ul"
      direction={{ xs: "column", sm: "row" }}
      spacing={{ xs: 2, sm: 4 }}
      justifyContent="center"
      sx={{ listStyle: "none", margin: 0, padding: 0, width: "100%" }}
    >
      {points.map(({ Icon, titleKey, subtitleKey }) => (
        <Stack key={titleKey} component="li" direction="row" alignItems="center" spacing={1.25} justifyContent="center">
          <Icon aria-hidden="true" sx={{ color: (theme: Theme) => theme.palette.primary.main, fontSize: 22 }} />
          <Stack>
            <Typography variant="body2" sx={{ color: (theme: Theme) => theme.custom.black, fontWeight: 700 }}>
              {t(titleKey)}
            </Typography>
            <Typography variant="caption" sx={{ color: (theme: Theme) => theme.custom.blackTranslucid }}>
              {t(subtitleKey)}
            </Typography>
          </Stack>
        </Stack>
      ))}
    </Stack>
  );
};

export default LandingDownloadTrustRow;
