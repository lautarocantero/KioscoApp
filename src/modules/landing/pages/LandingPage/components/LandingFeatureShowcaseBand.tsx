import { Box, type Theme } from "@mui/material";
import type { LandingFeatureShowcaseBandProps } from "@typings/landing/landingComponentTypes";
import { getLandingFeatureBandBackgroundColor } from "../../../helpers/getLandingFeatureBandBackgroundColor";
import { getNoisyBackgroundSx } from "../../../../shared/components/NoisyBackground/NoisyBackground";
import LandingFeatureShowcaseRow from "./LandingFeatureShowcaseRow";
import LandingWaveDivider from "./LandingWaveDivider";

const LandingFeatureShowcaseBand = ({ item, reverse, nextFillColor, waveVariant }: LandingFeatureShowcaseBandProps): React.ReactNode => {
  return (
    <Box
      component="article"
      sx={(theme: Theme) => ({
        width: "100%",
        paddingBlock: { xs: "4.5em", md: "7.5em" },
        paddingInline: { xs: "1.25em", md: "2em" },
        ...getNoisyBackgroundSx({ theme, backgroundColor: getLandingFeatureBandBackgroundColor(theme, item.accent) }),
        overflow: "hidden",
      })}
    >
      <Box sx={{ position: "relative", zIndex: 1, maxWidth: "1120px", margin: "0 auto" }}>
        <LandingFeatureShowcaseRow item={item} reverse={reverse} />
      </Box>

      <LandingWaveDivider fillColor={nextFillColor} variant={waveVariant} />
    </Box>
  );
};

export default LandingFeatureShowcaseBand;
