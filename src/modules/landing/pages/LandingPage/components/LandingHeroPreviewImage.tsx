import { Box, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import { getPublicAssetUrl } from "../../../../shared/helpers/getPublicAssetUrl";
import LandingHeroMascotImage from "./LandingHeroMascotImage";

const LandingHeroPreviewImage = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "760px" }}>
      <Box
        aria-hidden="true"
        sx={{
          position: "absolute",
          inset: "-4% 0 8% -6%",
          background: (theme: Theme) =>
            `radial-gradient(ellipse 58% 52% at 52% 50%, ${theme.palette.primary.main}cc 0%, ${theme.palette.primary.main}5c 46%, transparent 76%)`,
          filter: "blur(34px)",
          pointerEvents: "none",
        }}
      />
      <Box
        component="img"
        src={getPublicAssetUrl("images/backgroundImages/Stocko_representation.png")}
        alt={t("landing.hero.previewAlt")}
        sx={{
          position: "relative",
          zIndex: 1,
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
      <LandingHeroMascotImage />
    </Box>
  );
};

export default LandingHeroPreviewImage;
