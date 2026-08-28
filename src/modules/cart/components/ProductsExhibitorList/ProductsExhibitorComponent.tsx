import { ViewMode } from "@typings/cart/cartEnums";
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
    products,
    paginatedProducts,
    totalCount,
    page,
    pageCount,
    setPage,
    viewMode,
    setViewMode,
    gridSx,
    columns,
    presentationRows,
    handleAddPresentation,
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
      <ProductsToolbar
        totalCount={totalCount}
        presentationsCount={presentationRows.length}
        viewMode={viewMode}
        setViewMode={setViewMode}
      />
      <ProductsExhibitorList
        products={products}
        paginatedProducts={paginatedProducts}
        viewMode={viewMode}
        isLoading={loading}
        isEmpty={isEmpty}
        columns={columns}
        gridSx={gridSx}
        presentationRows={presentationRows}
        onAddPresentation={handleAddPresentation}
      />
      {viewMode === ViewMode.Grid && (
        <ProductsPagination page={page} count={pageCount} onChange={setPage} />
      )}
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;