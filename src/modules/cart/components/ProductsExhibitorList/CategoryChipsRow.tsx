import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import { Box, Chip, IconButton, type Theme } from "@mui/material";
import { useContext, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { useSellbarCategories } from "@hooks/cart/useSellbarCategories";
import { useHorizontalScrollArrows } from "@hooks/shared/useHorizontalScrollArrows";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";

const CategoryChipsRow = (): ReactNode => {
  const { t } = useTranslation();
  const { showSnackBar } = useContext(SnackBarContext)!;
  const { list, selected, getLabel, onSelect } = useSellbarCategories({ showSnackBar });
  const { scrollRef, canScrollLeft, canScrollRight, scrollLeft, scrollRight } = useHorizontalScrollArrows(list.length);

  if (list.length === 0) return null;

  return (
    <Box sx={{ display: "flex", alignItems: "center", flex: "1 1 auto", minWidth: 0, gap: 0.5 }}>
      {canScrollLeft && (
        <IconButton size="small" onClick={scrollLeft} aria-label={t("cart.productsExhibitor.categoryChips.scrollLeftAriaLabel")}>
          <ChevronLeftIcon fontSize="small" />
        </IconButton>
      )}

      <Box
        ref={scrollRef}
        sx={{
          display: "flex",
          flex: "1 1 auto",
          minWidth: 0,
          flexWrap: "nowrap",
          overflowX: "auto",
          overflowY: "hidden",
          gap: 1,
          py: 0.25,
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
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

      {canScrollRight && (
        <IconButton size="small" onClick={scrollRight} aria-label={t("cart.productsExhibitor.categoryChips.scrollRightAriaLabel")}>
          <ChevronRightIcon fontSize="small" />
        </IconButton>
      )}
    </Box>
  );
};

export default CategoryChipsRow;
