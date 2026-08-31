import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import ToolbarInfo from "../../components/ProductsExhibitorList/ToolbarInfo";

describe("ToolbarInfo", () => {
    it("muestra totalCount y presentationsCount recibidos", () => {
        renderWithTheme(<ToolbarInfo totalCount={12} presentationsCount={30} />);

        expect(screen.getByText("12 productos · 30 presentaciones")).toBeInTheDocument();
    });

    it("muestra 0 en ambos contadores cuando no hay datos", () => {
        renderWithTheme(<ToolbarInfo totalCount={0} presentationsCount={0} />);

        expect(screen.getByText("0 productos · 0 presentaciones")).toBeInTheDocument();
    });
});
