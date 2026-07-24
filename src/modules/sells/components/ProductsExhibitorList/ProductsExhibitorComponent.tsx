// ProductsExhibitorComponent.tsx
import type { ReactNode } from "react";
import ProductsExhibitorList from "./ProductsExhibitorList";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import { useProductsExhibitor } from "../../../../hooks/sells/useProductsExhibitor";
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
    gridSx,
    columns,
  } = useProductsExhibitor();

  return (
    <NoisyCard
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        mt: 10,
      }}
    >
      <ProductsToolbar totalCount={totalCount} />
      <ProductsExhibitorList
        products={paginatedProducts}
        viewMode={viewMode}
        isLoading={loading}
        isEmpty={isEmpty}
        columns={columns}
        gridSx={gridSx}
      />
      <ProductsPagination page={page} count={pageCount} onChange={setPage} />
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;