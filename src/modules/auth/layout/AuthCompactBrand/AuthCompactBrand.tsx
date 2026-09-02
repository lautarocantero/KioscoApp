import { Box, Typography, type Theme } from "@mui/material";
import { getPublicAssetUrl } from "../../../shared/helpers/getPublicAssetUrl";

const AuthCompactBrand = (): React.ReactNode => (
  <Box sx={{ display: "flex", alignItems: "center", gap: "0.4em" }}>
    <Box
      component="img"
      src={getPublicAssetUrl("images/logo/StockoLogo.png")}
      alt=""
      width={24}
      height={24}
      sx={{ objectFit: "contain", display: "block" }}
    />
    <Typography
      component="span"
      sx={(theme: Theme) => ({
        fontWeight: 700,
        fontSize: "1.1rem",
        color: theme.palette.primary.main,
      })}
    >
      Stocko
    </Typography>
  </Box>
);

export default AuthCompactBrand;
