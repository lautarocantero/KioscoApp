import { useState } from "react";
import { Stack, useTheme } from "@mui/material";
import { useTranslation } from "react-i18next";
import "animate.css";
import type { LandingFeatureShowcaseRowProps } from "@typings/landing/landingComponentTypes";
import { useScrollInAnimation } from "../../../../../hooks/landing/useScrollInAnimation";
import RolesPermissionsDialog from "../../../../shared/components/RolesPermissionsDialog/RolesPermissionsDialog";
import { getLandingAccentColor } from "../../../helpers/getLandingAccentColor";
import LandingFeatureShowcaseHeader from "./LandingFeatureShowcaseHeader";
import LandingFeatureShowcaseMedia from "./LandingFeatureShowcaseMedia";
import LandingFeatureShowcaseItems from "./LandingFeatureShowcaseItems";

const LandingFeatureShowcaseRow = ({ item, reverse }: LandingFeatureShowcaseRowProps): React.ReactNode => {
  const { t } = useTranslation();
  const theme = useTheme();
  const accentColor = getLandingAccentColor(theme, item.accent);
  const { ref, hasEntered } = useScrollInAnimation<HTMLDivElement>();
  const [rolesInfoOpen, setRolesInfoOpen] = useState(false);
  const hasClickableItem = item.items.some((gridItem) => gridItem.isClickable);

  return (
    <Stack
      ref={ref}
      className={hasEntered ? "animate__animated animate__fadeInRight" : undefined}
      direction="column"
      spacing={{ xs: 4.5, md: 6 }}
      sx={{
        width: "100%",
        opacity: hasEntered ? undefined : 0,
      }}
    >
      <LandingFeatureShowcaseHeader item={item} reverse={reverse} />

      <LandingFeatureShowcaseMedia alt={t(item.mediaAltKey)} videoSrc={item.mediaVideoSrc} accentColor={accentColor} />

      <LandingFeatureShowcaseItems
        items={item.items}
        accent={item.accent}
        onItemClick={hasClickableItem ? () => setRolesInfoOpen(true) : undefined}
      />

      {hasClickableItem && <RolesPermissionsDialog open={rolesInfoOpen} onClose={() => setRolesInfoOpen(false)} />}
    </Stack>
  );
};

export default LandingFeatureShowcaseRow;
