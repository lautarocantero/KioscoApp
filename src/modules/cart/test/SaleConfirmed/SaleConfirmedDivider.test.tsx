import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SaleConfirmedDivider from "../../components/SaleConfirmed/SaleConfirmedDivider";

describe("SaleConfirmedDivider", () => {
  it("renderiza la línea punteada decorativa", () => {
    const { container } = renderWithTheme(<SaleConfirmedDivider />);
    expect(container.firstElementChild).toHaveAttribute("aria-hidden", "true");
  });
});
