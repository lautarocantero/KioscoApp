import { Box, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";

const LandingHeroPreviewImage = (): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Box sx={{ position: "relative", width: "100%", maxWidth: "760px" }}>
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
        src="/images/backgroundImages/Stocko_representation.png"
        alt={t("landing.hero.previewAlt")}
        sx={{
          position: "relative",
          width: "100%",
          height: "auto",
          display: "block",
          objectFit: "contain",
        }}
      />
    </Box>
  );
};

export default LandingHeroPreviewImage;
