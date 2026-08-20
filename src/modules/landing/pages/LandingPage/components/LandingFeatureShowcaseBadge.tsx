import { Stack, Typography, useTheme, type Theme } from "@mui/material";
import type { LandingFeatureShowcaseBadgeProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";

const LandingFeatureShowcaseBadge = ({ label, accent }: LandingFeatureShowcaseBadgeProps): React.ReactNode => {
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, accent);

  return (
    <Stack
      direction="row"
      alignItems="center"
      spacing={1}
      sx={{
        border: "1px solid",
        borderColor: (t: Theme) => t?.custom?.darkGray,
        borderRadius: "999px",
        padding: "0.35em 0.9em",
        backgroundColor: `${accentColor}1a`,
      }}
    >
      <Stack sx={{ width: 8, height: 8, borderRadius: "50%", backgroundColor: accentColor }} />
      <Typography variant="body2" sx={{ color: accentColor, fontWeight: 600 }}>
        {label}
      </Typography>
    </Stack>
  );
};

export default LandingFeatureShowcaseBadge;
