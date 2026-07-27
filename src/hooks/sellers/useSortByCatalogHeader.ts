import { useState, type MouseEvent } from "react";
import { useProductsExhibitor } from "./useProductsExhibitor";
import type { SortOption } from "@typings/seller/sellerEnums";

export const useSortByCatalogHeader = () => {
  const { sort, handleSortChange, options } = useProductsExhibitor();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const isMenuOpen = Boolean(anchorEl);

  const onOpenMenu = (e: MouseEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const onCloseMenu = () => setAnchorEl(null);

  const handleSelect = (value: SortOption) => {
    handleSortChange({ target: { value } } as Parameters<typeof handleSortChange>[0]);
    onCloseMenu();
  };

  const selectedLabel = options.find((opt) => opt.value === sort)?.label;

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