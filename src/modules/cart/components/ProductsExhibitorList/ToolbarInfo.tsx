import { Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { ToolbarInfoProps } from "@typings/cart/cartComponentTypes";

const ToolbarInfo = ({
  totalCount,
  presentationsCount,
}: ToolbarInfoProps): ReactNode => {
  const { t } = useTranslation();

  return (
    <Typography
      variant="caption"
      sx={(theme: Theme) => ({
        flex: "0 0 auto",
        whiteSpace: "nowrap",
        color: theme.custom?.darkWhite,
        // En mobile no hay lugar para el texto completo al lado de los
        // chips de categoría (que necesitan su espacio para poder
        // scrollear) — se oculta y queda desde sm+, donde ya entra entero.
        display: { xs: "none", sm: "block" },
      })}
    >
      {t("cart.productsExhibitor.toolbar.availableCount", { count: totalCount, presentations: presentationsCount })}
    </Typography>
  );
};

export default ToolbarInfo;
