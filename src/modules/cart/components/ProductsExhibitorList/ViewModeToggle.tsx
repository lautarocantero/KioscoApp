import { Box, Tooltip, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import { ViewMode } from "@typings/cart/cartEnums";
import type { ViewModeToggleProps } from "@typings/cart/cartComponentTypes";

const TAB_SX = (theme: Theme, isActive: boolean) => ({
  cursor: "pointer",
  padding: "0.35em 0.8em",
  borderRadius: "6px",
  fontSize: theme.typography?.caption?.fontSize,
  fontWeight: 600,
  whiteSpace: "nowrap" as const,
  backgroundColor: isActive ? theme.custom?.white : "transparent",
  color: isActive ? theme.palette.primary.main : theme.custom?.darkWhite,
});

const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Tooltip title={t("cart.productsExhibitor.viewModeToggle.tooltip")}>
      <Box
        display="flex"
        alignItems="center"
        sx={(theme: Theme) => ({
          flexShrink: 0,
          gap: "0.25em",
          p: "0.25em",
          borderRadius: "8px",
          backgroundColor: theme.custom?.lightGray,
        })}
      >
        <Box
          role="button"
          onClick={() => setViewMode(ViewMode.Grid)}
          sx={(theme: Theme) => TAB_SX(theme, viewMode === ViewMode.Grid)}
        >
          {t("cart.productsExhibitor.viewModeToggle.gridLabel")}
        </Box>

        <Box
          role="button"
          onClick={() => setViewMode(ViewMode.Collapsed)}
          sx={(theme: Theme) => TAB_SX(theme, viewMode === ViewMode.Collapsed)}
        >
          {t("cart.productsExhibitor.viewModeToggle.denseLabel")}
        </Box>
      </Box>
    </Tooltip>
  );
};

export default ViewModeToggle;
