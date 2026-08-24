import { Box, type Theme } from "@mui/material";
import type { LandingFeatureShowcaseMediaProps } from "@typings/landing/landingComponentTypes";
import LandingMediaDecorationImage from "./LandingMediaDecorationImage";

const LandingFeatureShowcaseMedia = ({
  alt,
  videoSrc,
  accentColor,
  decorations = [],
}: LandingFeatureShowcaseMediaProps): React.ReactNode => {
  return (
    <Box sx={{ position: "relative", flex: 1.3, width: "100%" }}>
      <Box
        sx={{
          width: "100%",
          borderRadius: "20px",
          overflow: "hidden",
          border: "0.2em solid",
          borderColor: accentColor,
          boxShadow: (theme: Theme) => `0 30px 80px -30px ${theme.palette.primary.main}55`,
          p: 1,
        }}
      >
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

      {decorations.map((decoration) => (
        <LandingMediaDecorationImage key={decoration.src} decoration={decoration} />
      ))}
    </Box>
  );
};

export default LandingFeatureShowcaseMedia;
