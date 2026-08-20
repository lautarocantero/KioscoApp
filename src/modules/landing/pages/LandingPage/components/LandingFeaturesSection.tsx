import { Box, Stack, type Theme } from "@mui/material";
import { getLandingFeatureShowcase } from "../../../helpers/getLandingFeatureShowcase";
import { getSectionBackgroundSx } from "../../../helpers/getLandingBackgroundPatterns";
import LandingFeatureShowcaseRow from "./LandingFeatureShowcaseRow";

const LandingFeaturesSection = (): React.ReactNode => {
  const items = getLandingFeatureShowcase();

  return (
    <Box
      id="landing-features"
      component="section"
      sx={(theme: Theme) => ({
        ...getSectionBackgroundSx(theme),
        padding: { xs: "3em 1.25em", md: "5em 2em" },
      })}
    >
      <Stack spacing={{ xs: 6, md: 8 }} sx={{ maxWidth: "1120px", margin: "0 auto" }}>
        {items.map((item, index) => (
          <LandingFeatureShowcaseRow key={item.badgeKey} item={item} reverse={index % 2 === 1} />
        ))}
      </Stack>
    </Box>
  );
};

export default LandingFeaturesSection;
