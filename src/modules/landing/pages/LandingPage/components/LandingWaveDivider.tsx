import { Box } from "@mui/material";
import { useId } from "react";
import type { LandingWaveDividerProps } from "@typings/landing/landingComponentTypes";
import { getLandingWavePath } from "../../../helpers/getLandingWavePath";

// Mismos parámetros que getNoisyBackgroundSx (feTurbulence + saturate 0 +
// mixBlendMode screen), pero aplicados dentro del propio SVG de la onda —
// un fondo CSS tileado no puede recortarse a la forma curva de la onda.
const NOISE_BASE_FREQUENCY = 0.85;
const NOISE_OCTAVES = 3;
const NOISE_OPACITY = 0.06;

const LandingWaveDivider = ({ fillColor, variant = 0 }: LandingWaveDividerProps): React.ReactNode => {
  const uid = useId().replace(/:/g, "");
  const clipPathId = `landing-wave-clip-${uid}`;
  const noiseFilterId = `landing-wave-noise-${uid}`;
  const path = getLandingWavePath(variant);

  return (
    <Box
      aria-hidden="true"
      sx={{
        position: "absolute",
        left: 0,
        right: 0,
        bottom: "-1px",
        lineHeight: 0,
        pointerEvents: "none",
        zIndex: 1,
      }}
    >
      <Box
        component="svg"
        viewBox="0 0 1440 120"
        preserveAspectRatio="none"
        sx={{
          display: "block",
          width: "100%",
          height: { xs: "60px", md: "110px" },
          color: fillColor,
        }}
      >
        <defs>
          <clipPath id={clipPathId}>
            <path d={path} />
          </clipPath>
          <filter id={noiseFilterId}>
            <feTurbulence type="fractalNoise" baseFrequency={NOISE_BASE_FREQUENCY} numOctaves={NOISE_OCTAVES} stitchTiles="stitch" />
            <feColorMatrix type="saturate" values="0" />
          </filter>
        </defs>
        <g clipPath={`url(#${clipPathId})`}>
          <rect width="1440" height="120" fill="currentColor" />
          <rect
            width="1440"
            height="120"
            filter={`url(#${noiseFilterId})`}
            opacity={NOISE_OPACITY}
            style={{ mixBlendMode: "screen" }}
          />
        </g>
      </Box>
    </Box>
  );
};

export default LandingWaveDivider;
