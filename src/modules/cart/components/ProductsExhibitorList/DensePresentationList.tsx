import { Box, Typography, type Theme } from "@mui/material";
import { useTranslation } from "react-i18next";
import type { ReactNode } from "react";
import type { DensePresentationListProps } from "@typings/cart/cartComponentTypes";
import DensePresentationRow from "./DensePresentationRow";

const headerCellSx = (theme: Theme) => ({
  padding: "0.6em 0.8em",
  textAlign: "left" as const,
  color: theme.custom?.darkWhite,
  fontSize: theme.typography?.caption?.fontSize,
  borderBottom: `2px solid ${theme.custom?.darkGray}`,
  whiteSpace: "nowrap" as const,
});

/*══════════════════════════════════════════════════════════════════════╗
║ Vista de lista densa (ViewMode.Collapsed): una fila por presentación, ║
║ para catálogos grandes. minWidth fijo + overflow-x en el contenedor   ║
║ para que la tabla no se rompa en pantallas angostas.                  ║
╚══════════════════════════════════════════════════════════════════════╝*/
const DensePresentationList = ({ rows, onAdd }: DensePresentationListProps): ReactNode => {
  const { t } = useTranslation();

  if (rows.length === 0) {
    return (
      <Typography variant="body2" sx={(theme: Theme) => ({ color: theme.custom?.darkWhite, textAlign: "center", py: 4 })}>
        {t("cart.productsExhibitor.denseList.emptyMessage")}
      </Typography>
    );
  }

  return (
    <Box sx={{ width: "100%", overflowX: "auto" }}>
      <Box component="table" sx={{ minWidth: "880px", width: "100%", borderCollapse: "collapse" }}>
        <Box component="thead">
          <Box component="tr">
            <Box component="th" sx={headerCellSx}>{t("cart.productsExhibitor.denseList.columns.product")}</Box>
            <Box component="th" sx={headerCellSx}>{t("cart.productsExhibitor.denseList.columns.presentation")}</Box>
            <Box component="th" sx={headerCellSx}>{t("cart.productsExhibitor.denseList.columns.sku")}</Box>
            <Box component="th" sx={headerCellSx}>{t("cart.productsExhibitor.denseList.columns.category")}</Box>
            <Box component="th" sx={headerCellSx}>{t("cart.productsExhibitor.denseList.columns.price")}</Box>
            <Box component="th" sx={{ ...headerCellSx, textAlign: "center" }}>{t("cart.productsExhibitor.denseList.columns.actions")}</Box>
          </Box>
        </Box>
        <Box component="tbody">
          {rows.map((row) => (
            <DensePresentationRow key={row.key} row={row} onAdd={onAdd} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default DensePresentationList;
