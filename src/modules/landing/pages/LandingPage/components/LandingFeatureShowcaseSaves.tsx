import { Stack, Typography, type Theme } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import type { LandingFeatureShowcaseSavesProps } from "@typings/landing/landingComponentTypes";

const LandingFeatureShowcaseSaves = ({ text }: LandingFeatureShowcaseSavesProps): React.ReactNode => {
  return (
    <Stack direction="row" alignItems="center" spacing={1}>
      <CheckCircleOutlineIcon
        aria-hidden="true"
        sx={{ fontSize: 18, color: (theme: Theme) => theme.palette.success.main }}
      />
      <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: (theme: Theme) => theme.palette.success.main }}>
        {text}
      </Typography>
    </Stack>
  );
};

export default LandingFeatureShowcaseSaves;
