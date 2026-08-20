import { Box, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDesktopDownloadTargets } from "../../../helpers/getDesktopDownloadTargets";
import { getSectionBackgroundSx } from "../../../helpers/getLandingBackgroundPatterns";
import LandingDownloadOsCard from "./LandingDownloadOsCard";

const LandingDownloadSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const targets = getDesktopDownloadTargets();

  return (
    <Box
      id="landing-download"
      component="section"
      sx={(theme: Theme) => ({
        ...getSectionBackgroundSx(theme),
        padding: { xs: "3em 1.25em", md: "4em 2em" },
      })}
    >
      <Stack spacing={3} alignItems="center" sx={{ maxWidth: "720px", margin: "0 auto", textAlign: "center" }}>
        <Typography component="h2" variant="h3" sx={{ color: (theme: Theme) => theme?.custom?.white, fontWeight: 700 }}>
          {t("landing.download.title")}
        </Typography>
        <Typography variant="body1" sx={{ color: (theme: Theme) => theme?.custom?.darkWhite }}>
          {t("landing.download.subtitle")}
        </Typography>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ width: "100%", pt: 1 }}>
          {targets.map((target) => (
            <Box key={target.os} sx={{ flex: 1 }}>
              <LandingDownloadOsCard target={target} />
            </Box>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default LandingDownloadSection;
