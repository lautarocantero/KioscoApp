import { Box, Chip, type Theme } from "@mui/material";
import { useContext, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSellbarCategories } from "@hooks/cart/useSellbarCategories";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";

const CategoryChipsRow = (): ReactNode => {
  const { t } = useTranslation();
  const { showSnackBar } = useContext(SnackBarContext)!;
  const { list, selected, getLabel, onSelect } = useSellbarCategories({ showSnackBar });

  if (list.length === 0) return null;

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "nowrap",
        overflowX: "auto",
        gap: 1,
        pb: 0.5,
      }}
    >
      <Chip
        label={t("cart.productsExhibitor.categoryChips.allLabel")}
        onClick={() => onSelect(null)}
        sx={(theme: Theme) => ({
          flex: "0 0 auto",
          backgroundColor: selected === null ? theme.palette.primary.main : "transparent",
          color: selected === null ? theme.custom?.white : theme.custom?.fontColor,
          border: `1px solid ${theme.custom?.darkGray}`,
        })}
      />

      {list.map((category) => (
        <Chip
          key={category}
          label={getLabel(category)}
          onClick={() => onSelect(category)}
          sx={(theme: Theme) => ({
            flex: "0 0 auto",
            backgroundColor: selected === category ? theme.palette.primary.main : "transparent",
            color: selected === category ? theme.custom?.white : theme.custom?.fontColor,
            border: `1px solid ${theme.custom?.darkGray}`,
          })}
        />
      ))}
    </Box>
  );
};

export default CategoryChipsRow;
