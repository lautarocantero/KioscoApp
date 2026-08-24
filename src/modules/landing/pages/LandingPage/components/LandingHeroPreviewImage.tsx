import { Box, type Theme } from "@mui/material";
import { alpha } from "@mui/material/styles";
import { keyframes } from "@emotion/react";
import { useTranslation } from "react-i18next";
import { getPublicAssetUrl } from "../../../../shared/helpers/getPublicAssetUrl";

// Vaivén sutil de flotación, como si la imagen ondeara — se desactiva
// automáticamente si el usuario prefiere menos movimiento en pantalla.
const floatKeyframes = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-14px); }
`;

const LandingHeroPreviewImage = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "760px" }}>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: "18%",
          backgroundColor: (theme: Theme) => alpha(theme.palette.common.white, 0.08),
          transform: "rotate(45deg)",
          borderRadius: "24px",
          pointerEvents: "none",
        }}
      />
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: "6%",
          background: (theme: Theme) =>
            `radial-gradient(ellipse 60% 55% at 50% 55%, ${theme.palette.primary.main}b3 0%, ${theme.palette.primary.main}59 45%, transparent 75%)`,
          filter: "blur(30px)",
          pointerEvents: "none",
        }}
      />
      <Box
        component="img"
        src={getPublicAssetUrl("images/backgroundImages/Stocko_representation.png")}
        alt={t("landing.hero.previewAlt")}
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
          animation: `${floatKeyframes} 5s ease-in-out infinite`,
          "@media (prefers-reduced-motion: reduce)": { animation: "none" },
        }}
      />
    </Box>
  );
};

export default LandingHeroPreviewImage;
