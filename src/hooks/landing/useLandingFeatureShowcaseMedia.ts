import { useState } from "react";

export const useLandingFeatureShowcaseMedia = () => {
  const [hasVideoEnded, setHasVideoEnded] = useState(false);

  const handleVideoEnded = (): void => setHasVideoEnded(true);

  return { hasVideoEnded, handleVideoEnded };
};
