import { describe, it, expect, vi } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductsSkeletons from "../../components/ProductsExhibitorList/ProductsSkeletons";
import { SKELETON_COUNT } from "../../../../config/constants";

const gridSx = {
    display: "grid" as const,
    flexDirection: undefined,
    gridTemplateColumns: {
        xs: "repeat(1, 1fr)",
        sm: "repeat(4, 1fr)",
        md: "repeat(5, 1fr)",
        lg: "repeat(8, 1fr)",
    },
    rowGap: 2 as const,
    columnGap: 2 as const,
    width: "100%" as const,
    padding: 2 as const,
} as const;

vi.mock("../../components/ProductsExhibitorList/ProductsItemSkeleton", () => ({
    default: vi.fn(() => <div data-testid="product-item-skeleton" />),
}));

describe("ProductsSkeletons", () => {
    it("no renderiza nada cuando isLoading es false", () => {
        const { container } = renderWithTheme(
            <ProductsSkeletons isLoading={false} gridSx={gridSx} />
        );

        expect(container).toBeEmptyDOMElement();
    });

    it("renderiza SKELETON_COUNT skeletons cuando isLoading es true", () => {
        renderWithTheme(<ProductsSkeletons isLoading={true} gridSx={gridSx} />);

        expect(screen.getAllByTestId("product-item-skeleton")).toHaveLength(SKELETON_COUNT);
    });
});