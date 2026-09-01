import { Box, type Theme } from "@mui/material";
import type { LandingFeatureShowcaseMediaProps } from "@typings/landing/landingComponentTypes";
import LandingFeatureShowcaseMediaWatermark from "./LandingFeatureShowcaseMediaWatermark";

const LandingFeatureShowcaseMedia = ({ alt, videoSrc, accentColor }: LandingFeatureShowcaseMediaProps): React.ReactNode => {
  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: "0.2em solid",
        borderColor: accentColor,
        boxShadow: (theme: Theme) => `0 30px 80px -30px ${theme.palette.primary.main}55`,
        p: 1,
      }}
    >
      <LandingFeatureShowcaseMediaWatermark />

      <Box
        component="video"
        src={videoSrc}
        aria-label={alt}
        autoPlay
        loop
        muted
        playsInline
        disablePictureInPicture
        sx={{ width: "100%", height: "auto", display: "block", borderRadius: "20px" }}
      />
    </Box>
  );
};

export default LandingFeatureShowcaseMedia;
