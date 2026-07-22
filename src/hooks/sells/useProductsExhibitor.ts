// useProductsExhibitor.ts
import { useMemo } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useProductsListData } from "../products/useProductListData";
import type { Product } from "@typings/product/productTypes";
import type { UseProductsExhibitorResult } from "@typings/sells/sellTypes";
import { setSort, setViewMode, setPage, type RootState, type AppDispatch } from "../../store/seller/sellerSlice";
import type { SortOption } from "@typings/seller/sellerTypes";

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
  const dispatch = useDispatch<AppDispatch>();
  const { products } = useProductsListData();

  const sort = useSelector((state: RootState) => state.seller.sort);
  const viewMode = useSelector((state: RootState) => state.seller.viewMode);
  const page = useSelector((state: RootState) => state.seller.page);

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => sortProducts(safeProducts, sort), [safeProducts, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return sortedProducts.slice(start, start + PAGE_SIZE);
  }, [sortedProducts, page]);

  const handleSortChange = (e: SelectChangeEvent) => {
    dispatch(setSort(e.target.value as SortOption));
  };

  return {
    isEmpty: safeProducts.length === 0,
    paginatedProducts,
    totalCount: sortedProducts.length,
    page,
    pageCount,
    setPage: (p: number) => dispatch(setPage(p)),
    sort,
    handleSortChange,
    options: SORT_OPTIONS,
    viewMode,
    setViewMode: (v) => dispatch(setViewMode(v)),
  };
};