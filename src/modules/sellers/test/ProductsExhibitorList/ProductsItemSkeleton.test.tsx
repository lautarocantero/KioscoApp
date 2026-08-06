import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ProductItemSkeleton from "../../components/ProductsExhibitorList/ProductsItemSkeleton";

describe("ProductItemSkeleton", () => {
    it("renderiza el Skeleton", () => {
        const { container } = renderWithTheme(<ProductItemSkeleton />);

        expect(container.querySelector(".MuiSkeleton-root")).toBeInTheDocument();
    });

    it("el Skeleton es de tipo rectangular", () => {
        const { container } = renderWithTheme(<ProductItemSkeleton />);

        expect(container.querySelector(".MuiSkeleton-rectangular")).toBeInTheDocument();
    });
});