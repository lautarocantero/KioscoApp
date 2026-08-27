import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import ShopMonthlyReportFooter from "../../components/ShopMonthlyReportFooter";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

describe("ShopMonthlyReportFooter", () => {
    it("muestra el kiosco y la fecha de generación", () => {
        renderWithTheme(<ShopMonthlyReportFooter kioscoName="Kiosco Calle Fleming" generatedAt="2026-09-01T09:12:00.000Z" />);
        expect(screen.getByText(/Kiosco Calle Fleming/)).toBeInTheDocument();
    });

    it("no renderiza nada mientras no haya fecha de generación", () => {
        const { container } = renderWithTheme(<ShopMonthlyReportFooter kioscoName="Kiosco Calle Fleming" generatedAt={null} />);
        expect(container).toBeEmptyDOMElement();
    });
});
