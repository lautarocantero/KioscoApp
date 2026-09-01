import { Box } from "@mui/material";
import { getPublicAssetUrl } from "../../../../shared/helpers/getPublicAssetUrl";

const LandingFeatureShowcaseMediaWatermark = (): React.ReactNode => (
  <Box
    component="img"
    src={getPublicAssetUrl("images/logo/StocoLogoCircle.png")}
    alt=""
    aria-hidden="true"
    sx={{
      position: "absolute",
      right: { xs: 12, md: 20 },
      bottom: { xs: 10, md: 16 },
      width: { xs: 48, md: 68 },
      height: { xs: 48, md: 68 },
      objectFit: "contain",
      opacity: 0.4,
      zIndex: 3,
      pointerEvents: "none",
    }}
  />
);

export default LandingFeatureShowcaseMediaWatermark;
