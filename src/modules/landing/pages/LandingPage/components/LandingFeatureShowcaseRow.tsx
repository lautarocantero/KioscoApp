import { useState } from "react";
import { Stack, Typography, useTheme, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "animate.css";
import type { LandingFeatureShowcaseRowProps } from "@typings/landing/landingComponentTypes";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";
import { useScrollInAnimation } from "../../../../../hooks/landing/useScrollInAnimation";
import RolesPermissionsDialog from "../../../../shared/components/RolesPermissionsDialog/RolesPermissionsDialog";
import LandingFeatureShowcaseBadge from "./LandingFeatureShowcaseBadge";
import LandingFeatureShowcaseBullets from "./LandingFeatureShowcaseBullets";
import LandingFeatureShowcaseMedia from "./LandingFeatureShowcaseMedia";

const LandingFeatureShowcaseRow = ({ item, reverse }: LandingFeatureShowcaseRowProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, item.accent);
  const { ref, hasEntered } = useScrollInAnimation<HTMLDivElement>();
  const [rolesInfoOpen, setRolesInfoOpen] = useState(false);
  const hasRolesPermissionsBullet = item.bullets.some((bullet) => bullet.isClickable);

  return (
    <Stack
      ref={ref}
      className={hasEntered ? "animate__animated animate__fadeInRight" : undefined}
      direction={{ xs: "column", md: reverse ? "row-reverse" : "row" }}
      spacing={{ xs: 4, md: 6 }}
      alignItems="center"
      sx={{
        width: "100%",
        opacity: hasEntered ? undefined : 0,
      }}
    >
      <Stack spacing={2.5} alignItems={{ xs: "center", md: "flex-start" }} sx={{ flex: 1, minWidth: 0 }}>
        <LandingFeatureShowcaseBadge label={t(item.badgeKey)} accent={item.accent} />

        <Typography
          component="h3"
          variant="h4"
          sx={{
            color: (theme: Theme) => theme?.custom?.white,
            fontWeight: 700,
            textAlign: { xs: "center", md: "left" },
            fontSize: { md: "1.75rem" },
          }}
        >
          {t(item.titleStartKey)}
          <Typography component="span" variant="h4" sx={{ color: accentColor, fontWeight: 700, fontSize: { md: "1.75rem" } }}>
            {t(item.titleHighlightKey)}
          </Typography>
          {t(item.titleEndKey)}
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: (theme: Theme) => theme?.custom?.darkWhite,
            textAlign: { xs: "center", md: "left" },
            maxWidth: "440px",
            fontSize: { md: "1.3rem" },
          }}
        >
          {t(item.subtitleKey)}
        </Typography>

        <LandingFeatureShowcaseBullets
          bullets={item.bullets}
          accent={item.accent}
          onBulletClick={hasRolesPermissionsBullet ? () => setRolesInfoOpen(true) : undefined}
        />
      </Stack>

      <LandingFeatureShowcaseMedia
        alt={t(item.mediaAltKey)}
        videoSrc={item.mediaVideoSrc}
        decorations={item.mediaDecorations}
        accentColor={accentColor}
      />

      {hasRolesPermissionsBullet && (
        <RolesPermissionsDialog open={rolesInfoOpen} onClose={() => setRolesInfoOpen(false)} />
      )}
    </Stack>
  );
};

export default LandingFeatureShowcaseRow;
