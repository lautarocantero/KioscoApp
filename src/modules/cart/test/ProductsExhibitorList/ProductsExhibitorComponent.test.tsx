import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { useProductsExhibitor } from "../../../../hooks/sellers/useProductsExhibitor";
import { ViewMode } from "@typings/seller/sellerEnums";
import ProductsExhibitorComponent from "../../components/ProductsExhibitorList/ProductsExhibitorComponent";

vi.mock("@hooks/sellers/useProductsExhibitor");

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
        paginatedProducts: [],
        totalCount: 0,
        page: 1,
        pageCount: 1,
        setPage: vi.fn(),
        viewMode: ViewMode.Grid,
        setViewMode: vi.fn(),
        gridSx: {},
        columns: [],
        ...overrides,
    } as any);

describe("ProductsExhibitorComponent", () => {
    beforeEach(() => {
        vi.clearAllMocks();
        mockedHook.mockReturnValue(buildHookReturn());
    });

    it("renderiza los tres subcomponentes principales", () => {
        renderWithTheme(<ProductsExhibitorComponent />);

        expect(screen.getByTestId("products-toolbar")).toBeInTheDocument();
        expect(screen.getByTestId("products-exhibitor-list")).toBeInTheDocument();
        expect(screen.getByTestId("products-pagination")).toBeInTheDocument();
    });

    it("pasa totalCount y viewMode al toolbar", async () => {
        const ProductsToolbar = (await import("../../components/ProductsExhibitorList/ProductToolbar")).default;
        mockedHook.mockReturnValue(buildHookReturn({ totalCount: 25, viewMode: ViewMode.List }));

        renderWithTheme(<ProductsExhibitorComponent />);

        const props = vi.mocked(ProductsToolbar).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ totalCount: 25, viewMode: ViewMode.List }));
    });

    it("pasa products, isLoading, isEmpty y columns a la lista", async () => {
        const ProductsExhibitorList = (await import("../../components/ProductsExhibitorList/ProductsExhibitorList")).default;
        const products = [{ _id: "1", name: "Coca Cola" }];
        mockedHook.mockReturnValue(
            buildHookReturn({ paginatedProducts: products as any, loading: true, isEmpty: false })
        );

        renderWithTheme(<ProductsExhibitorComponent />);

        const props = vi.mocked(ProductsExhibitorList).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ products, isLoading: true, isEmpty: false }));
    });

    it("pasa page, count y onChange a la paginación", async () => {
        const ProductsPagination = (await import("../../components/ProductsExhibitorList/ProductsPagination")).default;
        const setPage = vi.fn();
        mockedHook.mockReturnValue(buildHookReturn({ page: 3, pageCount: 10, setPage }));

        renderWithTheme(<ProductsExhibitorComponent />);

        const props = vi.mocked(ProductsPagination).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ page: 3, count: 10, onChange: setPage }));
    });
});