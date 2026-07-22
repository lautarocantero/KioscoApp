import { useMemo, useState } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useProductsListData } from "../products/useProductListData";
import type { Product } from "@typings/product/productTypes";
import type { SortOption, ViewMode } from "../../modules/sells/components/ProductList/ProductToolbar";
import type { UseProductsExhibitorResult } from "@typings/sells/sellTypes";

const PAGE_SIZE = 20;

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: "name-asc", label: "Nombre A-Z" },
  { value: "name-desc", label: "Nombre Z-A" },
];

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products];
  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

export const useProductsExhibitor = (): UseProductsExhibitorResult => {
  const { products } = useProductsListData();
  const [viewMode, setViewMode] = useState<ViewMode>("grid");
  const [sort, setSort] = useState<SortOption>("name-asc");
  const [page, setPage] = useState(1);

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => sortProducts(safeProducts, sort), [safeProducts, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, page]);

  const handleSortChange = (e: SelectChangeEvent) => {
    setSort(e.target.value as SortOption);
    setPage(1);
  };

  return {
    isEmpty: safeProducts.length === 0,
    paginatedProducts,
    totalCount: sortedProducts.length,
    page,
    pageCount,
    setPage,
    sort,
    handleSortChange,
    options: SORT_OPTIONS,
    viewMode,
    setViewMode,
  };
};