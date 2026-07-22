import type { ReactNode } from "react";
import type { ProductsExhibitorProps } from "@typings/sells/SellComponentTypes";
import ProductsNotFound from "./ProductNotFound";
import ProductsList from "./ProductsList";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import { Box } from "@mui/material";
import { useProductsExhibitor } from "../../../../hooks/sells/useProductsExhibitor";

const ProductsExhibitorComponent = ({ title = "Productos" }: ProductsExhibitorProps): ReactNode => {
  const {
    isEmpty,
    paginatedProducts,
    totalCount,
    page,
    pageCount,
    setPage,
    sort,
    handleSortChange,
    viewMode,
    setViewMode,
  } = useProductsExhibitor();

  if (isEmpty) return <ProductsNotFound />;

  return (
    <Box sx={{ width: "100%", display: "flex", flexDirection: "column", gap: 2, padding: 2 }}>
      <ProductsToolbar
        totalCount={totalCount}
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