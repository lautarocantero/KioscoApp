import { Box, useTheme } from "@mui/material";
import { getLandingFeatureShowcase } from "../../../helpers/getLandingFeatureShowcase";
import { getLandingFeatureBandNextFillColor } from "../../../helpers/getLandingFeatureBandNextFillColor";
import LandingFeatureShowcaseBand from "./LandingFeatureShowcaseBand";

const LandingFeaturesSection = (): React.ReactNode => {
  const theme = useTheme();
  const items = getLandingFeatureShowcase();

  return (
    <Box id="landing-features" component="section">
      {items.map((item, index) => (
        <LandingFeatureShowcaseBand
          key={item.badgeKey}
          item={item}
          reverse={index % 2 === 1}
          nextFillColor={getLandingFeatureBandNextFillColor(theme, items, index)}
          waveVariant={index + 1}
        />
      ))}
    </Box>
  );
};

export default LandingFeaturesSection;
