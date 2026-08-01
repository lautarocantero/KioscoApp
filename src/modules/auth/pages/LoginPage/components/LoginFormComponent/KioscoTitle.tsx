import { Box, Typography, type Theme } from "@mui/material";
import stocoLogo from "../../../../../../../public/images/logo/StocoLogoalt.png";

const KioscoTitle = (): React.ReactNode => (
  <Box
    sx={{
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "0.3em",
      width: "100%",
    }}
  >
    <Typography
      component="span"
      sx={{
        display: "flex",
        alignItems: "center",
        color: (theme: Theme) => theme?.custom?.fontColor,
        fontSize: (theme: Theme) => ({
          xs: theme?.typography?.h3?.fontSize,
        }),
        lineHeight: 1,
      }}
      variant="h1"
    >
      Stocko
    </Typography>
    <img
      src={stocoLogo}
      alt="Stocko"
      width={32}
      height={32}
      style={{ objectFit: "contain", display: "block" }}
    />
  </Box>
);

export default KioscoTitle;