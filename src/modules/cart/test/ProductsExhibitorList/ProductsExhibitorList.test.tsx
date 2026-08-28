import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { ViewMode } from "@typings/cart/cartEnums";
import type { Product } from "@typings/product/productTypes";
import ProductsExhibitorList from "../../components/ProductsExhibitorList/ProductsExhibitorList";
import type { ProductsExhibitorListProps } from "@typings/cart/cartComponentTypes";
import type { PresentationRow } from "@typings/cart/cartTypes";

vi.mock("../../components/ProductItem/ProductItemComponent", () => ({
    default: vi.fn(() => <div data-testid="product-item" />),
}));
vi.mock("../../components/ProductsExhibitorList/ProductsSkeletons", () => ({
    default: vi.fn(() => <div data-testid="products-skeletons" />),
}));
vi.mock("../../components/ProductsExhibitorList/EmptyProductsList", () => ({
    default: vi.fn(() => <div data-testid="empty-products-list" />),
}));
vi.mock("../../components/ProductsExhibitorList/ProductExhibitorTable", () => ({
    default: vi.fn(() => <div data-testid="product-exhibitor-table" />),
}));
vi.mock("../../components/ProductsExhibitorList/DensePresentationList", () => ({
    default: vi.fn(({ rows }: { rows: unknown[] }) => <div data-testid="dense-presentation-list">{rows.length}</div>),
}));

const buildProduct = (overrides: Partial<Product> = {}): Product =>
    ({
        _id: "1",
        name: "Coca Cola",
        image_url: "/images/coca.png",
        presentations: [],
        ...overrides,
    } as Product);



describe("ProductsExhibitorList", () => {
    const gridSx = {
      display: "grid" as const,
      flexDirection: undefined,
      gridTemplateColumns: undefined,
      rowGap: 2 as const,
      columnGap: 2 as const,
      width: "100%" as const,
      padding: 2 as const,
  };

    const baseProps: Pick<ProductsExhibitorListProps, "products" | "paginatedProducts" | "gridSx" | "columns" | "presentationRows" | "onAddPresentation"> = {
        products: [],
        paginatedProducts: [],
        gridSx,
        columns: [],
        presentationRows: [],
        onAddPresentation: vi.fn(),
    };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza ProductsSkeletons cuando isLoading es true", () => {
        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                products={[]}
                viewMode={ViewMode.Grid}
                isLoading={true}
                isEmpty={false}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.getByTestId("products-skeletons")).toBeInTheDocument();
        expect(screen.queryByTestId("empty-products-list")).not.toBeInTheDocument();
    });

    it("prioriza isLoading sobre isEmpty", () => {
        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                products={[]}
                viewMode={ViewMode.Grid}
                isLoading={true}
                isEmpty={true}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.getByTestId("products-skeletons")).toBeInTheDocument();
        expect(screen.queryByTestId("empty-products-list")).not.toBeInTheDocument();
    });

    it("renderiza EmptyProductsList cuando isEmpty es true y no está cargando", () => {
        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                products={[]}
                viewMode={ViewMode.Grid}
                isLoading={false}
                isEmpty={true}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.getByTestId("empty-products-list")).toBeInTheDocument();
    });

    it("renderiza ProductExhibitorTable cuando viewMode es List", () => {
        const products = [buildProduct()];

        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                products={products}
                viewMode={ViewMode.List}
                isLoading={false}
                isEmpty={false}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.getByTestId("product-exhibitor-table")).toBeInTheDocument();
        expect(screen.queryByTestId("product-item")).not.toBeInTheDocument();
    });

    it("renderiza DensePresentationList cuando viewMode es Collapsed", () => {
        const products = [buildProduct()];

        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                products={products}
                viewMode={ViewMode.Collapsed}
                isLoading={false}
                isEmpty={false}
                columns={[]}
                gridSx={gridSx}
                presentationRows={[{ key: "1:1" } as unknown as PresentationRow]}
            />
        );

        expect(screen.getByTestId("dense-presentation-list")).toHaveTextContent("1");
        expect(screen.queryByTestId("product-item")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product-exhibitor-table")).not.toBeInTheDocument();
    });

    it("renderiza un ProductItemComponent por producto cuando viewMode es Grid", () => {
        const products = [buildProduct({ _id: "1" }), buildProduct({ _id: "2" })];

        renderWithTheme(
            <ProductsExhibitorList
                {...baseProps}
                paginatedProducts={products}
                products={products}
                viewMode={ViewMode.Grid}
                isLoading={false}
                isEmpty={false}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.getAllByTestId("product-item")).toHaveLength(2);
    });
});