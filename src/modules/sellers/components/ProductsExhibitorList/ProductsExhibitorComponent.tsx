// ProductsExhibitorComponent.tsx
import type { ReactNode } from "react";
import ProductsExhibitorList from "./ProductsExhibitorList";
import ProductsToolbar from "./ProductToolbar";
import { useProductsExhibitor } from "../../../../hooks/sellers/useProductsExhibitor";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { ViewMode } from "@typings/seller/sellerEnums";

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
        mt: viewMode !== ViewMode.Collapsed ? 10 : 2,
      }}
    >
      <ProductsToolbar totalCount={totalCount} viewMode={viewMode} setViewMode={setViewMode}/>
      <ProductsExhibitorList
        products={paginatedProducts}
        viewMode={viewMode}
        isLoading={loading}
        isEmpty={isEmpty}
        columns={columns}
        gridSx={gridSx}
        page={page} 
        count={pageCount} 
        onChange={setPage}
      />
      
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;