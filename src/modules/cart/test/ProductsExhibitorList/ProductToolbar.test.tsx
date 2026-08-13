import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { ViewMode } from "@typings/cart/cartEnums";
import ToolbarInfo from "../../components/ProductsExhibitorList/ToolbarInfo";
import ToolbarActions from "../../components/ProductsExhibitorList/ToolBarActions";
import ProductsToolbar from "../../components/ProductsExhibitorList/ProductToolbar";

vi.mock("../../components/ProductsExhibitorList/ToolbarInfo", () => ({
    default: vi.fn(() => <div data-testid="toolbar-info" />),
}));
vi.mock("../../components/ProductsExhibitorList/ToolBarActions", () => ({
    default: vi.fn(() => <div data-testid="toolbar-actions" />),
}));

describe("ProductsToolbar", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza ToolbarInfo y ToolbarActions", () => {
        renderWithTheme(
            <ProductsToolbar totalCount={10} viewMode={ViewMode.Grid} setViewMode={vi.fn()} />
        );

        expect(screen.getByTestId("toolbar-info")).toBeInTheDocument();
        expect(screen.getByTestId("toolbar-actions")).toBeInTheDocument();
    });

    it("pasa totalCount a ToolbarInfo", () => {
        renderWithTheme(
            <ProductsToolbar totalCount={25} viewMode={ViewMode.Grid} setViewMode={vi.fn()} />
        );

        const props = vi.mocked(ToolbarInfo).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ totalCount: 25 }));
    });

    it("pasa viewMode y setViewMode a ToolbarActions", () => {
        const setViewMode = vi.fn();

        renderWithTheme(
            <ProductsToolbar totalCount={10} viewMode={ViewMode.List} setViewMode={setViewMode} />
        );

        const props = vi.mocked(ToolbarActions).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ viewMode: ViewMode.List, setViewMode }));
    });
});