import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import { ViewMode } from "@typings/seller/sellerEnums";
import SortByCatalog from "../../components/ProductsExhibitorList/SortByCatalog";
import ViewModeToggle from "../../components/ProductsExhibitorList/ViewModeToggle";
import ToolbarActions from "../../components/ProductsExhibitorList/ToolBarActions";

vi.mock("../../components/ProductsExhibitorList/SortByCatalog", () => ({
    default: vi.fn(() => <div data-testid="sort-by-catalog" />),
}));
vi.mock("../../components/ProductsExhibitorList/ViewModeToggle", () => ({
    default: vi.fn(() => <div data-testid="view-mode-toggle" />),
}));

describe("ToolbarActions", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    it("renderiza SortByCatalog y ViewModeToggle", () => {
        renderWithTheme(<ToolbarActions viewMode={ViewMode.Grid} setViewMode={vi.fn()} />);

        expect(screen.getByTestId("sort-by-catalog")).toBeInTheDocument();
        expect(screen.getByTestId("view-mode-toggle")).toBeInTheDocument();
    });

    it("renderiza el texto de ayuda", () => {
        renderWithTheme(<ToolbarActions viewMode={ViewMode.Grid} setViewMode={vi.fn()} />);

        expect(screen.getByText("Elegí cómo querés ver tus productos")).toBeInTheDocument();
    });

    it("pasa viewMode a SortByCatalog", () => {
        renderWithTheme(<ToolbarActions viewMode={ViewMode.List} setViewMode={vi.fn()} />);

        const props = vi.mocked(SortByCatalog).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ viewMode: ViewMode.List }));
    });

    it("pasa viewMode y setViewMode a ViewModeToggle", () => {
        const setViewMode = vi.fn();

        renderWithTheme(<ToolbarActions viewMode={ViewMode.Grid} setViewMode={setViewMode} />);

        const props = vi.mocked(ViewModeToggle).mock.calls.at(-1)?.[0];
        expect(props).toEqual(expect.objectContaining({ viewMode: ViewMode.Grid, setViewMode }));
    });
});