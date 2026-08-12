import { useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { Product } from "@typings/product/productTypes";
import type { UseProductsExhibitorResult } from "@typings/sells/sellTypes";
import { setSort, setViewMode, setPage, type RootState, type AppDispatch } from "../../store/seller/sellerSlice";
import { SortOption, ViewMode } from "@typings/seller/sellerEnums";
import { PAGE_SIZE_PRODUCT_EXHIBITOR } from "../../config/constants";
import { useSortOptions } from "./useSortOptions";
import { useSellerProductsListData } from "./useSellerProductListData";
import { buildColumnsForProductExhibitor } from "../../modules/cart/components/ProductsExhibitorList/ProductExhibitorColumns";


//─── 🔎 Ordena el array de productos según la opción de sort activa 🔎 ───
const sortProducts = (products: Product[], sort: SortOption): Product[] => {
  const sorted = [...products];
  switch (sort) {
    case SortOption.NameAsc:
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case SortOption.NameDesc:
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    default:
      return sorted;
  }
};

/*══════════════════════════════════════════════════════════════════════╗
║ 🪝 useProductsExhibitor                                               ║
║                                                                       ║
║ Maneja el listado de productos del "escaparate" del vendedor:        ║
║   1. Trae productos vía useProductsListData (con stock disponible)   ║
║   2. Ordena (sort) y pagina en memoria sobre el resultado             ║
║   3. sort/viewMode/page viven en el store (Redux) para evitar         ║
║      aislamiento de estado entre instancias del componente           ║
║   4. Delega en useSortOptions las opciones y el handler de sort       ║
║   5. Arma los estilos de grilla/lista y las columnas del listado      ║
║   6. Expone tanto el listado completo ordenado (products, para el    ║
║      DataGrid en modo lista, que pagina internamente) como el         ║
║      recortado a la página actual (paginatedProducts, para el modo   ║
║      grid, que usa paginación manual vía ProductsPagination)          ║
╚══════════════════════════════════════════════════════════════════════╝*/

export const useProductsExhibitor = (): UseProductsExhibitorResult => {
  const dispatch = useDispatch<AppDispatch>();
  const { products, loading } = useSellerProductsListData();

  const sort = useSelector((state: RootState) => state.seller.sort);
  const viewMode = useSelector((state: RootState) => state.seller.viewMode);
  const page = useSelector((state: RootState) => state.seller.page);

  const { options, handleSortChange } = useSortOptions((value) => dispatch(setSort(value)));

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => sortProducts(safeProducts, sort), [safeProducts, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE_PRODUCT_EXHIBITOR));

  //─── 🔎 recorta el array ordenado según la página actual (solo para modo grid) 🔎 ───
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE_PRODUCT_EXHIBITOR;
    return sortedProducts.slice(start, start + PAGE_SIZE_PRODUCT_EXHIBITOR);
  }, [sortedProducts, page]);

  //─── 🔎 estilos responsivos: grilla en "Grid", columna única en "List" 🔎 ───
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
    products: sortedProducts,
    paginatedProducts,
    totalCount: sortedProducts.length,
    page,
    pageCount,
    setPage: (p: number) => { if (p === page) return; dispatch(setPage(p)); },
    sort,
    handleSortChange,
    options,
    viewMode,
    setViewMode: (v) => dispatch(setViewMode(v)),
    gridSx,
    columns,
  };
};