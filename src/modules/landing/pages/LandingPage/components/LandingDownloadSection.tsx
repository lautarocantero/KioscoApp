import { Box, Stack, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getDesktopDownloadTargets } from "../../../helpers/getDesktopDownloadTargets";
import { getLandingDownloadTrustPoints } from "../../../helpers/getLandingDownloadTrustPoints";
import { getWhiteSectionBackgroundSx } from "../../../helpers/getLandingBackgroundPatterns";
import LandingDownloadOsCard from "./LandingDownloadOsCard";
import LandingDownloadTrustRow from "./LandingDownloadTrustRow";
import LandingDotGridDecoration from "./LandingDotGridDecoration";

const LandingDownloadSection = (): React.ReactNode => {
  const { t } = useTranslation();
  const targets = getDesktopDownloadTargets();
  const trustPoints = getLandingDownloadTrustPoints();

  return (
    <Box
      id="landing-download"
      component="section"
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",
        ...getWhiteSectionBackgroundSx(theme),
        padding: { xs: "3em 1.25em", md: "5em 2em" },
      })}
    >
      <LandingDotGridDecoration side="left" />
      <LandingDotGridDecoration side="right" />

      <Stack spacing={5} alignItems="center" sx={{ position: "relative", maxWidth: "840px", margin: "0 auto" }}>
        <Stack spacing={1.5} alignItems="center" sx={{ textAlign: "center" }}>
          <Typography component="h2" variant="h3" sx={{ color: (theme: Theme) => theme?.custom?.black, fontWeight: 700 }}>
            {t("landing.download.title")}
          </Typography>
          <Typography variant="body1" sx={{ color: (theme: Theme) => theme?.custom?.blackTranslucid }}>
            {t("landing.download.subtitle")}
          </Typography>
        </Stack>

        <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5} sx={{ width: "100%" }}>
          {targets.map((target) => (
            <Box key={target.os} sx={{ flex: 1 }}>
              <LandingDownloadOsCard target={target} />
            </Box>
          ))}
        </Stack>

        <LandingDownloadTrustRow points={trustPoints} />
      </Stack>
    </Box>
  );
};

export default LandingDownloadSection;
