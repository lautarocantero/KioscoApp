import { ViewMode } from "@typings/seller/sellerEnums";
import type { ReactNode } from "react";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { useProductsExhibitor } from "@hooks/cart/useProductsExhibitor";
import ProductsExhibitorList from "./ProductsExhibitorList";

const ProductsExhibitorComponent = (): ReactNode => {
  const {
    isEmpty,
    loading,
    products,            // 👈 agregado: listado completo
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
        products={products}
        paginatedProducts={paginatedProducts}
        viewMode={viewMode}
        isLoading={loading}
        isEmpty={isEmpty}
        columns={columns}
        gridSx={gridSx}
      />
      {viewMode !== ViewMode.List && (
        <ProductsPagination page={page} count={pageCount} onChange={setPage} />
      )}
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;