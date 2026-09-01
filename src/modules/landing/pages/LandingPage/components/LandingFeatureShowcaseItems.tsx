import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { LandingFeatureShowcaseItemsProps } from "@typings/landing/landingComponentTypes";
import LandingFeatureShowcaseItemCard from "./LandingFeatureShowcaseItemCard";

const LandingFeatureShowcaseItems = ({ items, accent, onItemClick }: LandingFeatureShowcaseItemsProps): React.ReactNode => {
  const { t } = useTranslation();

  return (
    <Box
      component="ul"
      sx={{
        display: "grid",
        gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" },
        gap: 3,
        listStyle: "none",
        margin: 0,
        padding: 0,
        width: "100%",
      }}
    >
      {items.map(({ Icon, labelKey, detailKey, isClickable }) => (
        <LandingFeatureShowcaseItemCard
          key={labelKey}
          Icon={Icon}
          label={t(labelKey)}
          detail={t(detailKey)}
          accent={accent}
          isClickable={isClickable}
          onClick={isClickable ? onItemClick : undefined}
        />
      ))}
    </Box>
  );
};

export default LandingFeatureShowcaseItems;
