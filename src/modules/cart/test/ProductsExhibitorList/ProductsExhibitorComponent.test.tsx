import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { act, render, screen } from "@testing-library/react";
import { ThemeProvider } from "@mui/material/styles";
import { renderWithTheme, testTheme, mockSnackBarContext } from "../../../shared/test/utils/setupTests";
import { SnackBarContext } from "../../../shared/components/SnackBar/SnackBarContext";
import { ViewMode } from "@typings/cart/cartEnums";
import ProductsExhibitorComponent from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";
import { useProductsExhibitor } from "@hooks/cart/useProductsExhibitor";

// render() con `wrapper` (a diferencia de renderWithTheme, que anida el JSX
// a mano) sí re-envuelve automáticamente en cada rerender() — lo necesita
// el test que simula un refetch posterior sobre la MISMA instancia montada.
const renderWithRerenderableTheme = (ui: React.ReactElement) =>
    render(ui, {
        wrapper: ({ children }) => (
            <SnackBarContext.Provider value={mockSnackBarContext as never}>
                <ThemeProvider theme={testTheme}>{children}</ThemeProvider>
            </SnackBarContext.Provider>
        ),
    });

vi.mock("@hooks/cart/useProductsExhibitor");

vi.mock("../../components/ProductsExhibitorList/ProductsExhibitorList", () => ({
    default: vi.fn(() => <div data-testid="products-exhibitor-list" />),
}));
vi.mock("../../components/ProductsExhibitorList/ProductToolbar", () => ({
    default: vi.fn(() => <div data-testid="products-toolbar" />),
}));
vi.mock("../../components/ProductsExhibitorList/ProductsPagination", () => ({
    default: vi.fn(() => <div data-testid="products-pagination" />),
}));

const mockedHook = vi.mocked(useProductsExhibitor);

const buildHookReturn = (overrides: Partial<ReturnType<typeof useProductsExhibitor>> = {}) =>
    ({
        isEmpty: false,
        loading: false,
        products: [],
        paginatedProducts: [],
        totalCount: 0,
        page: 1,
        pageCount: 1,
        setPage: vi.fn(),
        viewMode: ViewMode.Grid,
        setViewMode: vi.fn(),
        gridSx: {},
        columns: [],
        presentationRows: [],
        handleAddPresentation: vi.fn(),
        ...overrides,
    }) as ReturnType<typeof useProductsExhibitor>;

// useInitialPageLoading difiere su primer chequeo un tick (ver su doc);
// alcanza con avanzar timers falsos ese tick para que resuelva.
const resolveInitialLoading = async () => {
    await act(async () => {
        vi.advanceTimersByTime(0);
    });
};

describe("ProductsExhibitorComponent", () => {
    beforeEach(() => {
        vi.useFakeTimers();
        vi.clearAllMocks();
        mockedHook.mockReturnValue(buildHookReturn());
    });

    afterEach(() => {
        vi.useRealTimers();
    });

    it("muestra el LoadingScreen (no el skeleton) en la primera carga del catálogo", async () => {
        mockedHook.mockReturnValue(buildHookReturn({ loading: true }));

        renderWithTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        expect(screen.getByRole("progressbar")).toBeInTheDocument();
        expect(screen.queryByTestId("products-toolbar")).not.toBeInTheDocument();
        expect(screen.queryByTestId("products-exhibitor-list")).not.toBeInTheDocument();
    });

    it("renderiza los tres subcomponentes principales una vez cargado el catálogo", async () => {
        renderWithTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        expect(screen.getByTestId("products-toolbar")).toBeInTheDocument();
        expect(screen.getByTestId("products-exhibitor-list")).toBeInTheDocument();
        expect(screen.getByTestId("products-pagination")).toBeInTheDocument();
    });

    it("pasa totalCount y viewMode al toolbar", async () => {
        const ProductsToolbar = (await import("../../components/ProductsExhibitorList/ProductToolbar")).default;
        mockedHook.mockReturnValue(buildHookReturn({ totalCount: 25, viewMode: ViewMode.List }));

        renderWithTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        const props = vi.mocked(ProductsToolbar).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ totalCount: 25, viewMode: ViewMode.List }));
    });

    it("pasa isLoading=true a la lista (skeleton propio) en un refetch posterior al primer render", async () => {
        const ProductsExhibitorList = (await import("../../components/ProductsExhibitorList/ProductsExhibitorList")).default;
        const { rerender } = renderWithRerenderableTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        const products = [{ _id: "1", name: "Coca Cola" }];
        mockedHook.mockReturnValue(
            buildHookReturn({ products: products as ReturnType<typeof useProductsExhibitor>["products"], loading: true, isEmpty: false })
        );
        rerender(<ProductsExhibitorComponent />);

        expect(screen.queryByRole("progressbar")).not.toBeInTheDocument();
        const props = vi.mocked(ProductsExhibitorList).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ products, isLoading: true, isEmpty: false }));
    });

    it("pasa page, count y onChange a la paginación", async () => {
        const ProductsPagination = (await import("../../components/ProductsExhibitorList/ProductsPagination")).default;
        const setPage = vi.fn();
        mockedHook.mockReturnValue(buildHookReturn({ page: 3, pageCount: 10, setPage, viewMode: ViewMode.Grid }));

        renderWithTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        const props = vi.mocked(ProductsPagination).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ page: 3, count: 10, onChange: setPage }));
    });

    it("no renderiza la paginación cuando viewMode es List", async () => {
        mockedHook.mockReturnValue(buildHookReturn({ viewMode: ViewMode.List }));

        renderWithTheme(<ProductsExhibitorComponent />);
        await resolveInitialLoading();

        expect(screen.queryByTestId("products-pagination")).not.toBeInTheDocument();
    });
});
