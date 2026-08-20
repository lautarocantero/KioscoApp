import { Box, type Theme } from "@mui/material";
import type { LandingFeatureShowcaseMediaProps } from "@typings/landing/landingComponentTypes";
import { useLandingFeatureShowcaseMedia } from "../../../../../hooks/landing/useLandingFeatureShowcaseMedia";

const LandingFeatureShowcaseMedia = ({ src, alt, videoSrc }: LandingFeatureShowcaseMediaProps): React.ReactNode => {
  const { hasVideoEnded, handleVideoEnded } = useLandingFeatureShowcaseMedia();

  return (
    <Box
      sx={{
        flex: 1.3,
        width: "100%",
        borderRadius: "20px",
        overflow: "hidden",
        border: "1px solid",
        borderColor: (theme: Theme) => theme?.custom?.darkGray,
        boxShadow: (theme: Theme) => `0 30px 80px -30px ${theme.palette.primary.main}55`,
      }}
    >
      {hasVideoEnded ? (
        <Box component="img" src={src} alt={alt} sx={{ width: "100%", height: "auto", display: "block" }} />
      ) : (
        <Box
          component="video"
          src={videoSrc}
          aria-label={alt}
          autoPlay
          muted
          playsInline
          disablePictureInPicture
          onEnded={handleVideoEnded}
          sx={{ width: "100%", height: "auto", display: "block" }}
        />
      )}
    </Box>
  );
};

export default LandingFeatureShowcaseMedia;
