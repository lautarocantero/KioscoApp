import { describe, it, expect } from "vitest";
import { renderWithTheme } from "../../../shared/test/utils/setupTests";
import SaleConfirmedFlashOverlay from "../../components/SaleConfirmed/SaleConfirmedFlashOverlay";

describe("SaleConfirmedFlashOverlay", () => {
  it("no renderiza nada cuando open es false", () => {
    const { container } = renderWithTheme(<SaleConfirmedFlashOverlay open={false} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("renderiza las 3 capas decorativas cuando open es true", () => {
    const { container } = renderWithTheme(<SaleConfirmedFlashOverlay open />);

    const root = container.firstElementChild;
    expect(root).toHaveAttribute("aria-hidden", "true");
    expect(root?.children).toHaveLength(3);
  });
});
