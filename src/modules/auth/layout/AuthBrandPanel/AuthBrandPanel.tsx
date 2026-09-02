import { Box, Typography, type Theme } from "@mui/material";
import { alpha, useTheme } from "@mui/material/styles";
import type { AuthBrandPanelProps } from "@typings/auth/authComponentTypes";
import { getNoisyBackgroundSx } from "../../../shared/components/NoisyBackground/NoisyBackground";
import { getAuthBrandLogoUrl } from "../../helpers/getAuthBrandLogoUrl";

const AuthBrandPanel = ({ tagline }: AuthBrandPanelProps): React.ReactNode => {
  const theme = useTheme();
  const logoUrl = getAuthBrandLogoUrl(theme.palette.mode);

  return (
    <Box
      component="aside"
      aria-label="Presentación de Stocko"
      sx={(theme: Theme) => ({
        display: { xs: "none", md: "flex" },
        width: { md: "60%" },
        flex: { md: "0 0 60%" },
        flexDirection: "column",
        boxSizing: "border-box",
        padding: { md: "2.5em" },
        ...getNoisyBackgroundSx({ theme, backgroundColor: theme.palette.primary.dark, noiseOpacity: 0.08 }),
        overflow: "hidden",
      })}
    >
      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          gap: "6px",
        }}
      >
        <Typography
          component="p"
          sx={(theme: Theme) => ({
            fontWeight: 800,
            fontSize: { xs: "2.75rem", md: "4rem" },
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            color: theme.custom?.lightMain,
          })}
        >
          Stocko
        </Typography>
        <Typography
          component="p"
          sx={(theme: Theme) => ({
            fontWeight: 500,
            fontSize: theme.typography.caption.fontSize,
            color: alpha(theme.custom?.lightMain, 0.65),
          })}
        >
          {tagline}
        </Typography>
      </Box>

      <Box
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Box
          component="img"
          src={logoUrl}
          alt=""
          sx={{
            width: { md: "26vw", lg: "22vw" },
            maxWidth: "420px",
            height: "auto",
            objectFit: "contain",
            display: "block",
          }}
        />
      </Box>
    </Box>
  );
};

export default AuthBrandPanel;
