import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { ViewMode } from "@typings/cart/cartEnums";
import ToolbarInfo from "../../components/ProductsExhibitorList/ToolbarInfo";
import ViewModeToggle from "../../components/ProductsExhibitorList/ViewModeToggle";
import ProductsToolbar from "../../components/ProductsExhibitorList/ProductToolbar";

vi.mock("../../components/ProductsExhibitorList/ToolbarInfo", () => ({
    default: vi.fn(() => <div data-testid="toolbar-info" />),
}));
vi.mock("../../components/ProductsExhibitorList/ViewModeToggle", () => ({
    default: vi.fn(() => <div data-testid="view-mode-toggle" />),
}));
vi.mock("../../components/ProductsExhibitorList/CategoryChipsRow", () => ({
    default: vi.fn(() => <div data-testid="category-chips-row" />),
}));

describe("ProductsToolbar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza las chips de categoría, el resumen y el toggle de vista en una sola fila", () => {
        renderWithTheme(
            <ProductsToolbar totalCount={10} presentationsCount={20} viewMode={ViewMode.Grid} setViewMode={vi.fn()} />
        );

        expect(screen.getByTestId("category-chips-row")).toBeInTheDocument();
        expect(screen.getByTestId("toolbar-info")).toBeInTheDocument();
        expect(screen.getByTestId("view-mode-toggle")).toBeInTheDocument();
    });

    it("pasa totalCount y presentationsCount a ToolbarInfo", () => {
        renderWithTheme(
            <ProductsToolbar totalCount={25} presentationsCount={40} viewMode={ViewMode.Grid} setViewMode={vi.fn()} />
        );

        const props = vi.mocked(ToolbarInfo).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ totalCount: 25, presentationsCount: 40 }));
    });

    it("pasa viewMode y setViewMode a ViewModeToggle", () => {
        const setViewMode = vi.fn();

        renderWithTheme(
            <ProductsToolbar totalCount={10} presentationsCount={15} viewMode={ViewMode.Collapsed} setViewMode={setViewMode} />
        );

        const props = vi.mocked(ViewModeToggle).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ viewMode: ViewMode.Collapsed, setViewMode }));
    });
});
