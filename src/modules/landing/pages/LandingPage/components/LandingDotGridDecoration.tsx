import { Box, type Theme } from "@mui/material";
import type { LandingDotGridDecorationProps } from "@typings/landing/landingComponentTypes";

const DOT_GRID_SIZE_PX = 16;

const LandingDotGridDecoration = ({ side }: LandingDotGridDecorationProps): React.ReactNode => {
  return (
    <Box
      aria-hidden="true"
      sx={(theme: Theme) => ({
        position: "absolute",
        top: "50%",
        transform: "translateY(-50%)",
        [side]: { xs: "-40px", md: "0px" },
        width: { xs: "120px", md: "160px" },
        height: { xs: "160px", md: "220px" },
        backgroundImage: `radial-gradient(${theme.palette.primary.main}33 1.5px, transparent 1.5px)`,
        backgroundSize: `${DOT_GRID_SIZE_PX}px ${DOT_GRID_SIZE_PX}px`,
        maskImage: `radial-gradient(ellipse at ${side === "left" ? "right" : "left"}, black 40%, transparent 75%)`,
        WebkitMaskImage: `radial-gradient(ellipse at ${side === "left" ? "right" : "left"}, black 40%, transparent 75%)`,
        pointerEvents: "none",
        display: { xs: "none", sm: "block" },
      })}
    />
  );
};

export default LandingDotGridDecoration;
