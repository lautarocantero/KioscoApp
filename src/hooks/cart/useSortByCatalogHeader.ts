import { useState, type MouseEvent } from "react";
import { useTranslation } from "react-i18next";
import { useProductsExhibitor } from "./useProductsExhibitor";
import type { SortOption } from "@typings/cart/cartEnums";

export const useSortByCatalog = () => {
  const { t } = useTranslation();
  const { sort, handleSortChange, options } = useProductsExhibitor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const onOpenMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const handleSelect = (value: SortOption) => {
    handleSortChange({ target: { value } } as Parameters<typeof handleSortChange>[0]);
    onCloseMenu();
  };

  const selectedLabel = options.find((opt) => opt.value === sort)
    ? t(`cart.productsExhibitor.sort.options.${sort}`)
    : undefined;

  return {
    anchorEl,
    isMenuOpen,
    onOpenMenu,
    onCloseMenu,
    handleSelect,
    selectedLabel,
    options,
  };
};