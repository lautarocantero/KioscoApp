import { ButtonBase, Stack, Typography, useTheme, type Theme } from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import type { LandingFeatureShowcaseItemCardProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";

const LandingFeatureShowcaseItemCard = ({
  Icon,
  label,
  detail,
  accent,
  isClickable,
  onClick,
}: LandingFeatureShowcaseItemCardProps): React.ReactNode => {
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, accent);

  return (
    <Stack component="li" direction="row" spacing={1.75} alignItems="flex-start" sx={{ listStyle: "none" }}>
      <Stack
        aria-hidden="true"
        alignItems="center"
        justifyContent="center"
        sx={{ width: 36, height: 36, borderRadius: "50%", backgroundColor: `${accentColor}22`, flexShrink: 0 }}
      >
        <Icon sx={{ fontSize: 18, color: accentColor }} />
      </Stack>

      <Stack spacing={0.5}>
        {isClickable ? (
          <ButtonBase
            onClick={onClick}
            sx={{ alignSelf: "flex-start", borderRadius: "6px", px: 0.5, mx: -0.5, "&:hover": { textDecoration: "underline" } }}
          >
            <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: accentColor }}>
              {label}
            </Typography>
            <ChevronRightIcon aria-hidden="true" sx={{ fontSize: 20, color: accentColor, ml: 0.25 }} />
          </ButtonBase>
        ) : (
          <Typography component="span" sx={{ fontSize: 16, fontWeight: 700, color: (theme: Theme) => theme?.custom?.white }}>
            {label}
          </Typography>
        )}

        <Typography
          component="span"
          variant="body2"
          sx={{ fontSize: 14, lineHeight: 1.45, color: (theme: Theme) => theme?.custom?.darkWhite }}
        >
          {detail}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default LandingFeatureShowcaseItemCard;
