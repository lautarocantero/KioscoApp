import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { ViewMode } from "@typings/seller/sellerEnums";
import type { Product } from "@typings/product/productTypes";
import ProductsExhibitorList from "../../components/ProductsExhibitorList/ProductsExhibitorList";

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
  };

    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza ProductsSkeletons cuando isLoading es true", () => {
        renderWithTheme(
            <ProductsExhibitorList
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

    it("no renderiza listado cuando viewMode es Collapsed", () => {
        const products = [buildProduct()];

        renderWithTheme(
            <ProductsExhibitorList
                products={products}
                viewMode={ViewMode.Collapsed}
                isLoading={false}
                isEmpty={false}
                columns={[]}
                gridSx={gridSx}
            />
        );

        expect(screen.queryByTestId("product-item")).not.toBeInTheDocument();
        expect(screen.queryByTestId("product-exhibitor-table")).not.toBeInTheDocument();
    });

    it("renderiza un ProductItemComponent por producto cuando viewMode es Grid", () => {
        const products = [buildProduct({ _id: "1" }), buildProduct({ _id: "2" })];

        renderWithTheme(
            <ProductsExhibitorList
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