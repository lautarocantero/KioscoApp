import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import ShopMonthlyReportVariationChip from "../../components/ShopMonthlyReportVariationChip";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";

describe("ShopMonthlyReportVariationChip", () => {
    it("muestra el label recibido", () => {
        renderWithTheme(<ShopMonthlyReportVariationChip isPositive label="▲ 14,6%" />);
        expect(screen.getByText("▲ 14,6%")).toBeInTheDocument();
    });
});
