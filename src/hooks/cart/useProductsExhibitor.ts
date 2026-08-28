import { useContext, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import type { Product } from "@typings/product/productTypes";
import type { Presentation } from "@typings/presentation/presentationTypes";
import type { UseProductsExhibitorResult } from "@typings/sells/sellTypes";
import { setSort, setViewMode, setPage, type RootState, type AppDispatch } from "../../store/cart/cartSlice";
import { SortOption, ViewMode } from "@typings/cart/cartEnums";
import { PAGE_SIZE_PRODUCT_EXHIBITOR } from "../../config/constants";
import { useSortOptions } from "./useSortOptions";
import { useSellerProductsListData } from "./useSellerProductListData";
import { buildColumnsForProductExhibitor } from "../../modules/cart/components/ProductsExhibitorList/ProductExhibitorColumns";
import { buildPresentationRows } from "../../modules/cart/helpers/buildPresentationRows";
import { getDefaultAddQuantity } from "../../modules/shared/helpers/saleTypeHelper";
import handleAddProductDialogItemToCart from "../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import { SnackBarContext } from "../../modules/shared/components/SnackBar/SnackBarContext";


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
  const { t } = useTranslation();
  const dispatch = useDispatch<AppDispatch>();
  const { showSnackBar } = useContext(SnackBarContext)!;
  const { products, loading } = useSellerProductsListData();

  const sort = useSelector((state: RootState) => state.cart.sort);
  const viewMode = useSelector((state: RootState) => state.cart.viewMode);
  const page = useSelector((state: RootState) => state.cart.page);

  const { options, handleSortChange } = useSortOptions((value) => dispatch(setSort(value)));

  const safeProducts = Array.isArray(products) ? products : [];

  const sortedProducts = useMemo(() => sortProducts(safeProducts, sort), [safeProducts, sort]);

  const pageCount = Math.max(1, Math.ceil(sortedProducts.length / PAGE_SIZE_PRODUCT_EXHIBITOR));

  //─── 🔎 recorta el array ordenado según la página actual (solo para modo grid) 🔎 ───
  const paginatedProducts = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE_PRODUCT_EXHIBITOR;
    return sortedProducts.slice(start, start + PAGE_SIZE_PRODUCT_EXHIBITOR);
  }, [sortedProducts, page]);

  //─── 🔎 estilos responsivos: grilla auto-fill en "Grid", columna única en "List" 🔎 ───
  // minmax(240px, 1fr) en vez de un conteo de columnas fijo por breakpoint:
  // las cards ya no tienen maxWidth/height fija (presentaciones inline con
  // alto variable), así que el grid se auto-ajusta al ancho disponible.
  const gridSx = {
    display: viewMode === ViewMode.Grid ? "grid" : "flex",
    flexDirection: viewMode === ViewMode.List ? "column" : undefined,
    gridTemplateColumns: viewMode === ViewMode.Grid ? "repeat(auto-fill, minmax(240px, 1fr))" : undefined,
    rowGap: 2,
    columnGap: 2,
    width: "100%",
    padding: 2,
  } as const;

  const columns = useMemo(() => buildColumnsForProductExhibitor(t), [t]);

  //─── 🔎 índice de presentaciones para la vista de lista densa (ViewMode.Collapsed) 🔎 ───
  const presentationRows = useMemo(() => buildPresentationRows(sortedProducts, t), [sortedProducts, t]);

  const handleAddPresentation = (presentation: Presentation): void => {
    void handleAddProductDialogItemToCart({
      presentation,
      quantity: getDefaultAddQuantity(presentation.sale_type),
      dispatch,
      showSnackBar,
      t,
    });
  };

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
    presentationRows,
    handleAddPresentation,
  };
};