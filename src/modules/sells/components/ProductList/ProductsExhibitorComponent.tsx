import { useMemo, useState } from "react";
import type { ProductsExhibitorProps } from "@typings/sells/SellComponentTypes";
import type { Product } from "../../../../typings/product/productTypes";
import ProductsNotFound from "./ProductNotFound";
import ProductsList from "./ProductsList";
import type { SortOption, ViewMode } from "./ProductToolbar";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import { Box } from "@mui/material";

const PAGE_SIZE = 20;

const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products];
  switch (sort) {
    case "name-asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name-desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "stock-asc":
      return sorted.sort((a, b) => (a.stock ?? 0) - (b.stock ?? 0));
    case "stock-desc":
      return sorted.sort((a, b) => (b.stock ?? 0) - (a.stock ?? 0));
    default:
      return sorted;
  }
};

const ProductsExhibitorComponent = ({ products, title = "Productos" }: ProductsExhibitorProps): React.ReactNode => {
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

  const handleSortChange = (value: SortOption) => {
    setSort(value);
    setPage(1);
  };

  if (safeProducts.length === 0) return <ProductsNotFound />;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <ProductsToolbar
        totalCount={sortedProducts.length}
        sortValue={sort}
        onSortChange={handleSortChange}
        viewMode={viewMode}
        onViewModeChange={setViewMode}
      />
      <ProductsList products={paginatedProducts} viewMode={viewMode} />
      <ProductsPagination page={page} count={pageCount} onChange={setPage} />
    </Box>
  );
};

export default ProductsExhibitorComponent;