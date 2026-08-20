import { Box, Stack, type Theme } from "@mui/material";
import LandingHeroContent from "./LandingHeroContent";
import LandingHeroPreviewImage from "./LandingHeroPreviewImage";
import LandingHeroCtaButtons from "./LandingHeroCtaButtons";
import { getSectionBackgroundSx } from "../../../helpers/getLandingBackgroundPatterns";

const LandingHero = (): React.ReactNode => {
  return (
    <Box
      component="section"
      aria-label="Stocko"
      sx={(theme: Theme) => ({
        position: "relative",
        overflow: "hidden",
        ...getSectionBackgroundSx(theme),
      })}
    >
      <Stack
        spacing={{ xs: 4, md: 5 }}
        alignItems="center"
        sx={{
          position: "relative",
          zIndex: 1,
          maxWidth: "1280px",
          margin: "0 auto",
          padding: { xs: "3em 1.25em", md: "5em 2em" },
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
