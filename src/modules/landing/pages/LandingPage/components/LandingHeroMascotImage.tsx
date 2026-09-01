import { Box } from "@mui/material";
import { getPublicAssetUrl } from "../../../../shared/helpers/getPublicAssetUrl";

const LandingHeroMascotImage = (): React.ReactNode => (
  <Box
    component="img"
    src={getPublicAssetUrl("images/stocko_images/stocko-mascot.png")}
    alt=""
    aria-hidden="true"
    sx={{
      position: "absolute",
      zIndex: 2,
      left: { xs: 0, md: "-6px", lg: "-24px" },
      bottom: "-30px",
      width: { xs: "150px", md: "230px" },
      display: "block",
      objectFit: "contain",
      filter: "drop-shadow(0 26px 42px rgba(12,10,24,0.5))",
      pointerEvents: "none",
    }}
  />
);

export default LandingHeroMascotImage;
