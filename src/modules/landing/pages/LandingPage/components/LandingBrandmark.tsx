import { Stack, Typography, type Theme } from "@mui/material";

const LandingBrandmark = (): React.ReactNode => (
  <Stack direction="row" alignItems="center" justifyContent={"center"} component="span" role="img" aria-label="Stocko">
    <img
      src="/images/logo/StocoLogoalt.png"
      alt="Stocko"
      width={42}
      height={42}
      style={{ objectFit: "contain", display: "block" }}
    />
    <Typography
      component="span"
      sx={{
        color: (theme: Theme) => theme?.custom?.white,
        fontWeight: 700,
        fontSize: (theme: Theme) => theme?.typography?.h5?.fontSize,
      }}
    >
    </Typography>
    <Typography
      aria-hidden="true"
      component="span"
      sx={{
        color: (theme: Theme) => theme?.custom?.white,
        fontWeight: 700,
        fontSize: (theme: Theme) => theme?.typography?.h5?.fontSize,
      }}
    >
      Stocko
    </Typography>
  </Stack>
);

export default LandingBrandmark;
