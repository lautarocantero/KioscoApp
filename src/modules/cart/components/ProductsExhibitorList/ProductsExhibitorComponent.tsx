import { ViewMode } from "@typings/cart/cartEnums";
import type { ReactNode } from "react";
import ProductsToolbar from "./ProductToolbar";
import ProductsPagination from "./ProductsPagination";
import NoisyCard from "../../../shared/components/Cards/NoisyCard";
import { useProductsExhibitor } from "@hooks/cart/useProductsExhibitor";
import { useInitialPageLoading } from "@hooks/ui/useInitialPageLoading";
import LoadingScreen from "../../../shared/components/LoadingScreen/LoadingScreen";
import ProductsExhibitorList from "./ProductsExhibitorList";

// La primera carga del catálogo de /new-sell tapa toolbar+grilla con
// LoadingScreen en vez del skeleton habitual (pedido explícito: "loader,
// productos cargados" al entrar por primera vez). useInitialPageLoading
// hace que esto sea SOLO en el primer montaje — una búsqueda, cambio de
// categoría o cualquier otro refetch posterior vuelve a usar el skeleton
// de ProductsExhibitorList (vía su propio isLoading), no este loader.
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
  const isCatalogLoading = useInitialPageLoading(loading);

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
      {isCatalogLoading ? (
        <LoadingScreen label="Cargando catálogo..." fullViewport={false} />
      ) : (
        <>
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
        </>
      )}
    </NoisyCard>
  );
};

export default ProductsExhibitorComponent;