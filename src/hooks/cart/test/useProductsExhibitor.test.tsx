import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useDispatch, useSelector } from "react-redux";
import { SortOption, ViewMode } from "@typings/cart/cartEnums";
import { useSellerProductsListData } from "../useSellerProductListData";
import { useSortOptions } from "../useSortOptions";
import { useProductsExhibitor } from "../useProductsExhibitor";
import { setPage, setViewMode } from "../../../store/cart/cartSlice";
import { buildColumnsForProductExhibitor } from "../../../modules/cart/components/ProductsExhibitorList/ProductExhibitorColumns";
import { SnackBarContext } from "../../../modules/shared/components/SnackBar/SnackBarContext";
import { AlertColor } from "@typings/ui/ui";
import handleAddProductDialogItemToCart from "../../../modules/cart/components/ProductDialog/handleAddProductItemToCart";
import type { Presentation } from "@typings/presentation/presentationTypes";

const wrapper = ({ children }: { children: React.ReactNode }) => (
    <SnackBarContext.Provider
        value={{ showSnackBar: vi.fn(), closeSnackBar: vi.fn(), snackBar: { open: false, message: "", color: AlertColor.Info } }}
    >
        {children}
    </SnackBarContext.Provider>
);

vi.mock("react-redux", async () => {
    const actual = await vi.importActual("react-redux");
    return {
        ...actual,
        useDispatch: vi.fn(),
        useSelector: vi.fn(),
    };
});

vi.mock("../useSellerProductListData");
vi.mock("../useSortOptions");
vi.mock("../../../modules/cart/components/ProductsExhibitorList/ProductExhibitorColumns");
vi.mock("../../../modules/cart/components/ProductDialog/handleAddProductItemToCart");

const mockedUseDispatch = vi.mocked(useDispatch);
const mockedUseSelector = vi.mocked(useSelector);
const mockedUseSellerProductsListData = vi.mocked(useSellerProductsListData);
const mockedUseSortOptions = vi.mocked(useSortOptions);
const mockedBuildColumns = vi.mocked(buildColumnsForProductExhibitor);

const buildProduct = (overrides: Partial<{ _id: string; name: string }> = {}) => ({
    _id: "1",
    name: "Coca Cola",
    image_url: "",
    presentations: [],
    ...overrides,
});

//─── 🔎 Shape de RootState['cart'] que este hook toca (sort/viewMode/page). ───
//    Antes vivía bajo la key "seller", pero el store la renombró a "cart"
//    (ver cartSlice.ts / useProductsExhibitor.ts -> state.cart.sort).
const buildSelectorState = ({
    sort = SortOption.NameAsc,
    viewMode = ViewMode.Grid,
    page = 1,
}: { sort?: SortOption; viewMode?: ViewMode; page?: number } = {}) => ({
    cart: { sort, viewMode, page },
});

describe("useProductsExhibitor", () => {
    const dispatch = vi.fn();

    beforeEach(() => {
        vi.clearAllMocks();
        mockedUseDispatch.mockReturnValue(dispatch);
        mockedUseSellerProductsListData.mockReturnValue({
            products: [buildProduct({ _id: "1", name: "Coca Cola" }), buildProduct({ _id: "2", name: "Sprite" })],
            loading: false,
        } as any);
        mockedUseSortOptions.mockReturnValue({
            options: [],
            handleSortChange: vi.fn(),
        } as any);
        mockedBuildColumns.mockReturnValue([]);
    });

    const mockSelector = (state = buildSelectorState()) => {
        mockedUseSelector.mockImplementation((selectorFn: any) => selectorFn(state));
    };

    describe("setPage", () => {
        it("no despacha si la página es igual a la actual", () => {
            mockSelector(buildSelectorState({ page: 1 }));
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            act(() => {
                result.current.setPage(1);
            });

            expect(dispatch).not.toHaveBeenCalled();
        });

        it("despacha setPage si la página cambia", () => {
            mockSelector(buildSelectorState({ page: 1 }));
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            act(() => {
                result.current.setPage(2);
            });

            expect(dispatch).toHaveBeenCalledWith(setPage(2));
        });
    });

    describe("setViewMode", () => {
        it("despacha setViewMode con el valor recibido", () => {
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            act(() => {
                result.current.setViewMode(ViewMode.List);
            });

            expect(dispatch).toHaveBeenCalledWith(setViewMode(ViewMode.List));
        });
    });

    describe("isEmpty", () => {
        it("es false cuando hay productos", () => {
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.isEmpty).toBe(false);
        });

        it("es true cuando no hay productos", () => {
            mockedUseSellerProductsListData.mockReturnValue({ products: [], loading: false } as any);
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.isEmpty).toBe(true);
        });

        it("es true cuando products no es un array", () => {
            mockedUseSellerProductsListData.mockReturnValue({ products: undefined, loading: false } as any);
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.isEmpty).toBe(true);
        });
    });

    describe("orden y paginación", () => {
        it("ordena los productos por nombre ascendente", () => {
            mockedUseSellerProductsListData.mockReturnValue({
                products: [buildProduct({ _id: "2", name: "Sprite" }), buildProduct({ _id: "1", name: "Coca Cola" })],
                loading: false,
            } as any);
            mockSelector(buildSelectorState({ sort: SortOption.NameAsc }));

            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.paginatedProducts.map((p) => p.name)).toEqual(["Coca Cola", "Sprite"]);
        });

        it("ordena los productos por nombre descendente", () => {
            mockedUseSellerProductsListData.mockReturnValue({
                products: [buildProduct({ _id: "1", name: "Coca Cola" }), buildProduct({ _id: "2", name: "Sprite" })],
                loading: false,
            } as any);
            mockSelector(buildSelectorState({ sort: SortOption.NameDesc }));

            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.paginatedProducts.map((p) => p.name)).toEqual(["Sprite", "Coca Cola"]);
        });

        it("calcula pageCount en base al total de productos", () => {
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.totalCount).toBe(2);
            expect(result.current.pageCount).toBeGreaterThanOrEqual(1);
        });
    });

    describe("gridSx", () => {
        it("usa display grid cuando viewMode es Grid", () => {
            mockSelector(buildSelectorState({ viewMode: ViewMode.Grid }));
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.gridSx.display).toBe("grid");
            expect(result.current.gridSx.flexDirection).toBeUndefined();
        });

        it("usa display flex y flexDirection column cuando viewMode es List", () => {
            mockSelector(buildSelectorState({ viewMode: ViewMode.List }));
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.gridSx.display).toBe("flex");
            expect(result.current.gridSx.flexDirection).toBe("column");
        });
    });

    describe("presentationRows / handleAddPresentation", () => {
        const presentation: Presentation = {
            _id: "pres-1",
            brand: "",
            category: [],
            created_at: "",
            description: "",
            expiration_date: "",
            image_url: "",
            min_stock: 5,
            model_size: 500,
            model_type: "bottle",
            model_unit: "ml" as Presentation["model_unit"],
            name: "Coca Cola 500ml",
            price: 100,
            product_id: "1",
            barcode: "",
            sku: "SKU-1",
            stock: 20,
            updated_at: "",
            is_perishable: false,
            sale_type: "unit" as Presentation["sale_type"],
        };

        it("aplana las presentaciones de los productos ya ordenados", () => {
            mockedUseSellerProductsListData.mockReturnValue({
                products: [buildProduct({ _id: "1", name: "Coca Cola" })].map((p) => ({ ...p, presentations: [presentation] })),
                loading: false,
            } as ReturnType<typeof useSellerProductsListData>);
            mockSelector();

            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            expect(result.current.presentationRows).toHaveLength(1);
            expect(result.current.presentationRows[0].presentationId).toBe("pres-1");
        });

        it("handleAddPresentation delega en el pipeline compartido con quantity=1 para venta por unidad", () => {
            mockSelector();
            const { result } = renderHook(() => useProductsExhibitor(), { wrapper });

            act(() => result.current.handleAddPresentation(presentation));

            expect(vi.mocked(handleAddProductDialogItemToCart)).toHaveBeenCalledWith(
                expect.objectContaining({ presentation, quantity: 1 })
            );
        });
    });
});