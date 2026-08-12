import type { ReactNode } from "react";
import ProductsExhibitorList from "./ProductsExhibitorList";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import { useProductsExhibitor } from "../../../../hooks/sellers/useProductsExhibitor";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";

const ProductsExhibitorComponent = (): ReactNode => {
  const {
    isEmpty,
    loading,
    paginatedProducts,
    totalCount,
    page,
    pageCount,
    setPage,
    viewMode,
    setViewMode,
    gridSx,
    columns,
  } = useProductsExhibitor();

  return (
    <NoisyCard
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 2,
        scrollMarginTop: "1em",
      }}
    >
      <ProductsToolbar totalCount={totalCount} viewMode={viewMode} setViewMode={setViewMode} />
      <ProductsExhibitorList
        products={paginatedProducts}
        paginatedProducts={paginatedProducts}
        viewMode={viewMode}
        isLoading={loading}
        isEmpty={isEmpty}
        columns={columns}
        gridSx={gridSx}
        page={page}
        count={pageCount}
        onChange={setPage}
      />
      <ProductsPagination page={page} count={pageCount} onChange={setPage} />
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;