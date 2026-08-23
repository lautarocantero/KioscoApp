import { Box, Stack, useTheme, type Theme } from "@mui/material";
import LandingHeroContent from "./LandingHeroContent";
import LandingHeroPreviewImage from "./LandingHeroPreviewImage";
import LandingHeroCtaButtons from "./LandingHeroCtaButtons";
import LandingWaveDivider from "./LandingWaveDivider";
import { getHeroBackgroundImageSx } from "../../../helpers/getLandingBackgroundPatterns";
import { getLandingFeatureShowcase } from "../../../helpers/getLandingFeatureShowcase";
import { getLandingFeatureBandBackgroundColor } from "../../../helpers/getLandingFeatureBandBackgroundColor";

const LandingHero = (): React.ReactNode => {
  const theme = useTheme();
  const [firstFeature] = getLandingFeatureShowcase();
  const nextSectionColor = getLandingFeatureBandBackgroundColor(theme, firstFeature.accent);

  return (
    <Box
      component="section"
      aria-label="Stocko"
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",
        ...getHeroBackgroundImageSx(theme),
      })}
    >
      <LandingWaveDivider fillColor={nextSectionColor} />

      <Stack
        spacing={{ xs: 4, md: 5 }}
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: { xs: "3em 1.25em", md: "5em 2em" },
          paddingTop: { xs: "calc(3em + 96px)", md: "calc(5em + 72px)" },
        }}
      >
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={{ xs: 6, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
          sx={{ width: "100%" }}
        >
          <LandingHeroContent />
          <LandingHeroPreviewImage />
        </Stack>

        <LandingHeroCtaButtons />
      </Stack>
    </Box>
  );
};

export default LandingHero;
