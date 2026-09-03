import { describe, it, expect } from "vitest";
import { screen } from "@testing-library/react";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SaleConfirmedBarcode from "../../components/SaleConfirmed/SaleConfirmedBarcode";

describe("SaleConfirmedBarcode", () => {
  it("dibuja las barras decorativas y el código de ticket", () => {
    const { container } = renderWithTheme(<SaleConfirmedBarcode code="#000184" />);

    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelectorAll("rect").length).toBeGreaterThan(0);
    expect(screen.getByText("#000184")).toBeInTheDocument();
  });
});
