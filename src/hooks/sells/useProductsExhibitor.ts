import { useMemo } from "react";
import type { SelectChangeEvent } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useProductsListData } from "../products/useProductListData";
import type { Product } from "@typings/product/productTypes";
import type { UseProductsExhibitorResult } from "@typings/sells/sellTypes";
import { setSort, setViewMode, setPage, type RootState, type AppDispatch } from "../../store/seller/sellerSlice";
import { SortOption, ViewMode } from "@typings/seller/sellerEnums";
import type { SortOption as SortOptionType } from "@typings/seller/sellerEnums";
import { PAGE_SIZE_PRODUCT_EXHIBITOR } from "../../config/constants";
import { buildColumnsForProductExhibitor } from "../../modules/sells/components/ProductsExhibitorList/ProductExhibitorColumns";


const SORT_OPTIONS: { value: SortOptionType; label: string }[] = [
  { value: SortOption.NameAsc, label: "Nombre A-Z" },
  { value: SortOption.NameDesc, label: "Nombre Z-A" },
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
  const { products, loading } = useProductsListData();

  const sort = useSelector((state: RootState) => state.seller.sort);
  const viewMode = useSelector((state: RootState) => state.seller.viewMode);
  const page = useSelector((state: RootState) => state.seller.page);

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => sortProducts(safeProducts, sort), [safeProducts, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE_PRODUCT_EXHIBITOR));

  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE_PRODUCT_EXHIBITOR;
    return sortedProducts.slice(start, start + PAGE_SIZE_PRODUCT_EXHIBITOR);
  }, [sortedProducts, page]);

  const handleSortChange = (e: SelectChangeEvent) => {
    dispatch(setSort(e.target.value as SortOption));
  };

  const gridSx = {
    display: viewMode === ViewMode.Grid ? "grid" : "flex",
    flexDirection: viewMode === ViewMode.List ? "column" : undefined,
    gridTemplateColumns:
      viewMode === ViewMode.Grid
        ? {
            xs: "repeat(1, 1fr)",
            sm: "repeat(4, 1fr)",
            md: "repeat(5, 1fr)",
            lg: "repeat(8, 1fr)",
          }
        : undefined,
    rowGap: 2,
    columnGap: 2,
    width: "100%",
    padding: 2,
  } as const;

  const columns = useMemo(() => buildColumnsForProductExhibitor(), []);

  return {
    isEmpty: safeProducts.length === 0,
    loading,
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
    gridSx,
    columns,
  };
};