import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SaleConfirmedTicketEdge from "../../components/SaleConfirmed/SaleConfirmedTicketEdge";

describe("SaleConfirmedTicketEdge", () => {
  it("dibuja el zig-zag decorativo", () => {
    const { container } = renderWithTheme(<SaleConfirmedTicketEdge />);
    expect(container.querySelector("svg")).toHaveAttribute("aria-hidden", "true");
    expect(container.querySelector("path")).toBeInTheDocument();
  });

  it("usa un path distinto cuando flipped es true", () => {
    const { container: top } = renderWithTheme(<SaleConfirmedTicketEdge flipped={false} />);
    const { container: bottom } = renderWithTheme(<SaleConfirmedTicketEdge flipped />);

    const topD = top.querySelector("path")?.getAttribute("d");
    const bottomD = bottom.querySelector("path")?.getAttribute("d");
    expect(topD).not.toEqual(bottomD);
  });
});
