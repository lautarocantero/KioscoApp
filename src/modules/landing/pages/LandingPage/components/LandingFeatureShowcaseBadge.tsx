import { Typography, useTheme } from "@mui/material";
import type { LandingFeatureShowcaseBadgeProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";

const LandingFeatureShowcaseBadge = ({ label, accent }: LandingFeatureShowcaseBadgeProps): React.ReactNode => {
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, accent);

  return (
    <Typography
      component="span"
      sx={{
        display: "block",
        fontSize: { xs: 40, md: 84 },
        fontWeight: 800,
        lineHeight: 0.85,
        color: accentColor,
        opacity: 0.32,
        textWrap: "pretty",
      }}
    >
      {label}
    </Typography>
  );
};

export default LandingFeatureShowcaseBadge;
