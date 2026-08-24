import { Box } from "@mui/material";
import type { LandingMediaDecorationImageProps } from "@typings/landing/landingComponentTypes";
import { getDecorationPositionSx } from "../../../helpers/getDecorationPositionSx";

const LandingMediaDecorationImage = ({ decoration }: LandingMediaDecorationImageProps): React.ReactNode => {
  return (
    <Box
      component="img"
      src={decoration.src}
      alt=""
      aria-hidden="true"
      sx={{
        position: "absolute",
        width: { xs: "48px", md: "72px" },
        height: "auto",
        zIndex: 2,
        pointerEvents: "none",
        ...getDecorationPositionSx(decoration.position),
      }}
    />
  );
};

export default LandingMediaDecorationImage;
