import type { SxProps, Theme } from "@mui/material";
import { LandingDecorationPosition } from "@typings/landing/landingEnums";

const DECORATION_EDGE_OFFSET = "-1.5em";

export const getDecorationPositionSx = (position: LandingDecorationPosition): SxProps<Theme> => {
  if (position === LandingDecorationPosition.BottomLeft) {
    return { bottom: DECORATION_EDGE_OFFSET, left: DECORATION_EDGE_OFFSET };
  }
  return { bottom: DECORATION_EDGE_OFFSET, right: DECORATION_EDGE_OFFSET };
};
